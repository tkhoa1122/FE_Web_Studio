'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  DollarSign, 
  CheckCircle, 
  X,
  ArrowLeft,
  Package,
  Camera,
  Lightbulb,
  Mic,
  Video
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ScrollToTop from '../../components/common/ScrollToTop';
import { PageTransition } from '../../components/common/PageTransition';
import { StaggeredSections } from '../../components/common/StaggeredAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/application/redux/store';
import { fetchRoomById, fetchAllRooms } from '@/application/redux/services/RoomService';
import { createBooking, createInvoice } from '@/application/redux/services/BookingService';
import { setSelectedBooking, setSelectedInvoice } from '@/application/redux/slices/bookingSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import InvoiceDetail from '../../components/common/InvoiceDetail';
import Link from 'next/link';
import BookingBreadcrumb from './components/BookingBreadcrumb';
import RoomInfo from './components/RoomInfo';
import PriceSummary from './components/PriceSummary';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { axiosInstance } from '@/config/axios';

function BookingPageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedRoom, rooms, loading, error } = useSelector((state: RootState) => state.rooms);
  const { selectedBooking, selectedInvoice, loading: bookingLoading } = useSelector((state: RootState) => state.bookings);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomIdParam = searchParams?.get('roomId');
  const roomId = roomIdParam ? parseInt(roomIdParam) : NaN;
  
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState(1); // 1: Booking Form, 2: Confirmation, 3: Invoice
  const [selectedRoomLocalId, setSelectedRoomLocalId] = useState<number | null>(null);
  const [selectedEquipments, setSelectedEquipments] = useState<Record<number, number>>({}); // equipmentid -> quantity
  const [roomBookings, setRoomBookings] = useState<any[]>([]);
  // No modal on booking invoice; nothing to handle here
  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState<{date?: boolean; start?: boolean; end?: boolean; qty?: boolean}>({});

  useEffect(() => {
    // Clear previous booking/invoice data when entering booking page
    dispatch(setSelectedBooking(null));
    dispatch(setSelectedInvoice(null));
    
    // If roomId provided via query → fetch that room
    if (!isNaN(roomId) && roomId > 0) {
      dispatch(fetchRoomById(roomId));
    } else {
      // Otherwise load rooms catalog to select from
      if (!rooms || rooms.length === 0) {
        dispatch(fetchAllRooms());
      }
    }
  }, [dispatch, roomId]);
  const selectedRoomToUse = React.useMemo(() => {
    if (selectedRoomLocalId) {
      return rooms.find(r => r.roomid === selectedRoomLocalId) || null;
    }
    return selectedRoom || null;
  }, [selectedRoomLocalId, rooms, selectedRoom]);

  // Prefetch existing bookings of selected room (for client-side overlap validation)
  useEffect(() => {
    const load = async () => {
      if (!selectedRoomToUse) return setRoomBookings([]);
      try {
        const res = await axiosInstance.get('booking', { params: { roomid: selectedRoomToUse.roomid, page: 1, limit: 200 } });
        const list = Array.isArray(res.data?.data) ? res.data.data : res.data?.data?.items || [];
        setRoomBookings(list);
      } catch (e) {
        setRoomBookings([]);
      }
    };
    load();
  }, [selectedRoomToUse?.roomid, selectedDate]);

  const formatPrice = (price: number) => {
    // VN currency display without decimal comma
    return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(price);
  };

  const getEquipmentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'light':
        return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'camera':
        return <Camera className="w-5 h-5 text-blue-500" />;
      case 'audio':
        return <Mic className="w-5 h-5 text-green-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const calculateTotalPrice = () => {
    if (!selectedRoomToUse) return 0;
    const roomPrice = parseFloat(selectedRoomToUse.price);
    const hours = calculateHours();
    const roomTotal = roomPrice * hours * quantity;
    const equipmentsTotal = Object.entries(selectedEquipments).reduce((sum, [equipmentId, qty]) => {
      const eq = selectedRoomToUse.equipments.find(e => e.equipmentid === Number(equipmentId));
      if (!eq || !(eq as any).price) return sum;
      const unit = parseFloat((eq as any).price);
      return sum + unit * (qty || 0) * hours; // equipment charged per hour
    }, 0);
    return roomTotal + equipmentsTotal;
  };

  const calculateHours = () => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    return Math.max(0, diffMs / (1000 * 60 * 60));
  };

  const hours = React.useMemo(() => calculateHours(), [startTime, endTime]);
  const displayHours = hours === 0 ? 1 : hours; // dùng 1 giờ để ước tính khi chưa chọn giờ
  const displayHoursText = Number(displayHours.toFixed(1));

  const validateForm = (): string[] => {
    const errs: string[] = [];
    if (!selectedRoomToUse) errs.push('Vui lòng chọn phòng.');
    if (!selectedDate) errs.push('Vui lòng chọn ngày.');
    if (!startTime) errs.push('Vui lòng chọn giờ bắt đầu.');
    if (!endTime) errs.push('Vui lòng chọn giờ kết thúc.');
    if (startTime && endTime) {
      const start = new Date(`2000-01-01T${startTime}`);
      const end = new Date(`2000-01-01T${endTime}`);
      if (end <= start) errs.push('Giờ kết thúc phải sau giờ bắt đầu.');
    }
    // Validate within studio operating hours
    if (selectedRoomToUse) {
      const parseHHMM = (t: string) => {
        const [hh, mm] = t.split(':').map((v) => parseInt(v, 10));
        return hh * 60 + mm;
      };
      const ci = parseHHMM(selectedRoomToUse.checkintime);
      const co = parseHHMM(selectedRoomToUse.checkouttime);
      if (startTime) {
        const st = parseHHMM(startTime);
        if (st < ci || st > co) {
          errs.push(`Giờ bắt đầu phải nằm trong khung ${selectedRoomToUse.checkintime} - ${selectedRoomToUse.checkouttime}.`);
        }
      }
      if (endTime) {
        const et = parseHHMM(endTime);
        if (et < ci || et > co) {
          errs.push(`Giờ kết thúc phải nằm trong khung ${selectedRoomToUse.checkintime} - ${selectedRoomToUse.checkouttime}.`);
        }
      }
    }
    if (quantity < 1) errs.push('Số lượng phòng tối thiểu là 1.');
    if (selectedRoomToUse?.equipments) {
      for (const eq of selectedRoomToUse.equipments) {
        const q = selectedEquipments[eq.equipmentid] || 0;
        if (q > eq.quantity) errs.push(`Thiết bị ${eq.equipmentname} chỉ còn ${eq.quantity}.`);
        if (q < 0) errs.push(`Số lượng thiết bị ${eq.equipmentname} không hợp lệ.`);
      }
    }
    // Overlap validation: selected room and time must be free
    if (selectedRoomToUse && selectedDate && startTime && endTime) {
      const newStart = new Date(`${selectedDate}T${startTime}:00Z`).getTime();
      const newEnd = new Date(`${selectedDate}T${endTime}:00Z`).getTime();
      if (newEnd > newStart) {
        const hasOverlap = roomBookings.some((b: any) => {
          const s = new Date(b.starttime).getTime();
          const e = new Date(b.endtime).getTime();
          return !(newEnd <= s || newStart >= e);
        });
        if (hasOverlap) {
          errs.push('Khung giờ này đã được đặt. Vui lòng chọn thời gian khác.');
        }
      }
    }

    return errs;
  };
  const formErrors = React.useMemo(() => validateForm(), [selectedRoomToUse, selectedDate, startTime, endTime, quantity, selectedEquipments]);

  const handleBookingSubmit = async () => {
    const errs = formErrors;
    if (errs.length > 0 || !user) {
      setShowErrors(true);
      return;
    }

    const startDateTime = new Date(`${selectedDate}T${startTime}:00Z`);
    const endDateTime = new Date(`${selectedDate}T${endTime}:00Z`);

    const userId = (user as any)?.userid ?? (user as any)?.id ?? (user as any)?.userId;
    if (!userId || userId < 1) {
      setShowErrors(true);
      alert('Bạn cần đăng nhập để đặt phòng.');
      return;
    }

    const equipmentDetails = Object.entries(selectedEquipments)
      .filter(([, qty]) => (qty || 0) > 0)
      .map(([equipmentid, qty]) => ({ equipmentid: Number(equipmentid), quantity: Number(qty) }));

    // TypeScript guard: ensure selectedRoomToUse is not null before using
    if (!selectedRoomToUse) {
      setShowErrors(true);
      return;
    }

    // Overlap đã kiểm tra trong validateForm; BE vẫn xác thực lại khi tạo booking

    const bookingData = {
      userid: userId,
      starttime: startDateTime.toISOString(),
      endtime: endDateTime.toISOString(),
      details: [
        { roomid: selectedRoomToUse.roomid, quantity: quantity },
        ...equipmentDetails
      ]
    };

    try {
      const bookingResult = await dispatch(createBooking(bookingData));
      if (createBooking.fulfilled.match(bookingResult)) {
        setStep(2);
      } else {
        alert('Có lỗi xảy ra khi tạo booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Có lỗi xảy ra khi tạo booking');
    }
  };

  const handleCreateInvoice = async () => {
    if (!selectedBooking) return;

    const invoiceData = {
      bookingid: selectedBooking.bookingid,
      notes: notes || `Hóa đơn đặt phòng ${selectedRoomToUse?.roomtype}`
    };

    try {
      const invoiceResult = await dispatch(createInvoice(invoiceData));
      if (createInvoice.fulfilled.match(invoiceResult)) {
        setStep(3);
      } else {
        alert('Có lỗi xảy ra khi tạo hóa đơn');
      }
    } catch (error) {
      console.error('Invoice error:', error);
      alert('Có lỗi xảy ra khi tạo hóa đơn');
    }
  };

  if (loading && (!rooms || rooms.length === 0) && !selectedRoomToUse) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" fullScreen={false} message="Đang tải..." delayMs={500} />
      </div>
    );
  }

  // If no selected room (access via /views/booking), show room selection grid

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
      <Header />

      <StaggeredSections staggerDelay={150}>
          {/* Breadcrumb */}
          <section className="py-4 bg-white border-b">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/views/studios" className="hover:text-[#667EEA] transition-colors">
                  Studios
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-semibold">Đặt phòng</span>
        </div>
        </div>
      </section>

          {/* Room Selection if none selected */}
          {(!selectedRoomToUse) && (
            <section className="py-12">
              <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Chọn phòng để đặt</h2>
                  <p className="text-gray-600">Chọn một phòng phù hợp để tiếp tục đặt lịch</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rooms.map(room => (
                    <button
                      key={room.roomid}
                      onClick={() => setSelectedRoomLocalId(room.roomid)}
                      className="text-left bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all"
                    >
                      <div className="h-44 overflow-hidden">
                        <img src={room.banner || room.images[0]?.imageLink || ''} className="w-full h-full object-cover" />
                </div>
                      <div className="p-4">
                        <p className="font-bold text-gray-900 mb-1">{room.roomtype}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{room.description}</p>
              </div>
                    </button>
                  ))}
          </div>
        </div>
      </section>
          )}

      {/* Booking Form */}
          {step === 1 && selectedRoomToUse && (
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center justify-between mb-8">
                    {selectedRoomToUse && (
                      <Link 
                        href={`/views/rooms/${selectedRoomToUse.roomid}`}
                        className="flex items-center space-x-2 text-gray-600 hover:text-[#667EEA] transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Quay lại</span>
                      </Link>
                    )}
          </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Room Info */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin phòng</h2>
                      
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={selectedRoomToUse.banner || selectedRoomToUse.images[0]?.imageLink || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'}
                            alt={selectedRoomToUse.roomtype}
                            className="w-20 h-20 rounded-xl object-cover"
                          />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{selectedRoomToUse.roomtype}</h3>
                            <p className="text-gray-600">{selectedRoomToUse.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4 text-[#667EEA]" />
                                <span className="text-sm text-gray-600">{selectedRoomToUse.address}</span>
                  </div>
                </div>
                  </div>
                </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3">
                            <Clock className="w-5 h-5 text-[#667EEA]" />
                            <div>
                              <p className="text-sm text-gray-600">Giờ hoạt động</p>
                              <p className="font-semibold">{selectedRoomToUse.checkintime} - {selectedRoomToUse.checkouttime}</p>
                        </div>
                </div>
                          <div className="flex items-center space-x-3">
                            <DollarSign className="w-5 h-5 text-[#667EEA]" />
                            <div>
                              <p className="text-sm text-gray-600">Giá thuê</p>
                              <p className="font-semibold">{formatPrice(parseFloat(selectedRoomToUse.price))} ₫/giờ</p>
                </div>
                  </div>
                </div>

                        {/* Equipment selection */}
                        {selectedRoomToUse?.equipments && selectedRoomToUse.equipments.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Chọn thiết bị (tính theo giờ)</h4>
                            <div className="space-y-3">
                              {selectedRoomToUse.equipments.map((eq) => {
                                const hasPrice = Boolean((eq as any).price);
                                const value = selectedEquipments[eq.equipmentid] || 0;
                                return (
                                  <div key={eq.equipmentid} className="flex items-center justify-between p-3 rounded-lg border">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                                        {(eq as any).image ? (
                                          <img src={(eq as any).image} alt={eq.equipmentname} className="w-full h-full object-cover" />
                                        ) : (
                                          getEquipmentIcon(eq.equipmenttype)
                                        )}
                  </div>
                                      <div>
                                        <p className="font-semibold text-gray-900">{eq.equipmentname}</p>
                                        <p className="text-xs text-gray-600">
                                          {hasPrice ? `${formatPrice(parseFloat((eq as any).price))} ₫/giờ` : 'Liên hệ'} | Còn: {eq.quantity}
                                        </p>
                </div>
              </div>
                                    <div className="flex items-center gap-2">
                      <button
                                        type="button"
                                        onClick={() => setSelectedEquipments((prev) => ({...prev, [eq.equipmentid]: Math.max(0, (prev[eq.equipmentid] || 0) - 1)}))}
                                        className="px-2 py-1 rounded-lg border text-gray-700 hover:bg-gray-50"
                      >
                                        -
                      </button>
                                      <input
                                        type="number"
                                        min={0}
                                        max={eq.quantity}
                                        value={value}
                                        onChange={(e) => {
                                          const v = Math.min(eq.quantity, Math.max(0, Number(e.target.value)));
                                          setSelectedEquipments((prev) => ({...prev, [eq.equipmentid]: v}));
                                        }}
                                        className="w-16 text-center px-2 py-1 rounded-lg border"
                                      />
                      <button
                                        type="button"
                                        onClick={() => setSelectedEquipments((prev) => ({...prev, [eq.equipmentid]: Math.min(eq.quantity, (prev[eq.equipmentid] || 0) + 1)}))}
                                        className="px-2 py-1 rounded-lg border text-gray-700 hover:bg-gray-50"
                      >
                                        +
                      </button>
                    </div>
                  </div>
                                );
                              })}
                                </div>
                              </div>
                            )}
                          </div>
                  </div>

                    {/* Booking Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin đặt phòng</h2>
                      {showErrors && formErrors.length > 0 && (
                        <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-700 text-sm space-y-1">
                          {formErrors.map((e, i) => (
                            <div key={i}>• {e}</div>
                    ))}
              </div>
            )}

                      <form onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(); }} className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Ngày đặt phòng
                          </label>
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                            required
                          />
                          {touched.date && !selectedDate && (
                            <p className="mt-1 text-xs text-red-600">Vui lòng chọn ngày.</p>
                            )}
                </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              <Clock className="w-4 h-4 inline mr-2" />
                              Giờ bắt đầu
                            </label>
                            <input
                              type="time"
                              value={startTime}
                              onChange={(e) => { setStartTime(e.target.value); if (!touched.start) setTouched(prev=>({...prev,start:true})); }}
                              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                              required
                            />
                          {touched.start && !startTime && (
                            <p className="mt-1 text-xs text-red-600">Vui lòng chọn giờ bắt đầu.</p>
                )}
                          {touched.start && startTime && selectedRoomToUse && (() => {
                            const toMin = (t:string)=>{ const [h,m]=t.split(':').map(Number); return h*60+m; };
                            const st=toMin(startTime); const ci=toMin(selectedRoomToUse.checkintime); const co=toMin(selectedRoomToUse.checkouttime);
                            return (st < ci || st > co);
                          })() && (
                            <p className="mt-1 text-xs text-red-600">Giờ bắt đầu phải trong {selectedRoomToUse.checkintime} - {selectedRoomToUse.checkouttime}.</p>
                          )}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              <Clock className="w-4 h-4 inline mr-2" />
                              Giờ kết thúc
                            </label>
                    <input
                              type="time"
                              value={endTime}
                              onChange={(e) => { setEndTime(e.target.value); if (!touched.end) setTouched(prev=>({...prev,end:true})); }}
                              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                              required
                    />
                          {touched.end && !endTime && (
                            <p className="mt-1 text-xs text-red-600">Vui lòng chọn giờ kết thúc.</p>
                          )}
                          {touched.end && touched.start && endTime && startTime && (new Date(`2000-01-01T${endTime}`) <= new Date(`2000-01-01T${startTime}`)) && (
                            <p className="mt-1 text-xs text-red-600">Giờ kết thúc phải sau giờ bắt đầu.</p>
                          )}
                          {touched.end && endTime && selectedRoomToUse && (() => {
                            const toMin = (t:string)=>{ const [h,m]=t.split(':').map(Number); return h*60+m; };
                            const et=toMin(endTime); const ci=toMin(selectedRoomToUse.checkintime); const co=toMin(selectedRoomToUse.checkouttime);
                            return (et < ci || et > co);
                          })() && (
                            <p className="mt-1 text-xs text-red-600">Giờ kết thúc phải trong {selectedRoomToUse.checkintime} - {selectedRoomToUse.checkouttime}.</p>
                          )}
                  </div>
                </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Users className="w-4 h-4 inline mr-2" />
                            Số lượng phòng
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={quantity}
                            onChange={(e) => { setQuantity(parseInt(e.target.value)); if (!touched.qty) setTouched(prev=>({...prev,qty:true})); }}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                            required
                          />
                          {touched.qty && quantity < 1 && (
                            <p className="mt-1 text-xs text-red-600">Số lượng phòng tối thiểu là 1.</p>
                )}
                </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Ghi chú (tùy chọn)
                          </label>
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                            placeholder="Nhập ghi chú cho booking..."
                          />
                </div>

                        {/* Price Summary */}
                        <div className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] rounded-xl p-6 text-white">
                          <h3 className="text-lg font-bold mb-4">Tóm tắt giá</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Giá phòng ({quantity} phòng × {displayHoursText} giờ{hours===0 ? ' (ước tính)' : ''})</span>
                              <span>{formatPrice((selectedRoomToUse ? parseFloat(selectedRoomToUse.price) : 0) * quantity * displayHours)} ₫</span>
                </div>
                            {/* Equipments Breakdown */}
                            {selectedRoomToUse?.equipments && Object.entries(selectedEquipments).some(([,q]) => (q||0) > 0) && (
                              <div className="space-y-1 text-sm text-white/90">
                                {selectedRoomToUse.equipments.map((eq) => {
                                  const qty = selectedEquipments[eq.equipmentid] || 0;
                                  if (qty <= 0 || !(eq as any).price) return null;
                                  const unit = parseFloat((eq as any).price);
                                  const total = unit * qty * displayHours;
                    return (
                                    <div key={eq.equipmentid} className="flex justify-between">
                                      <span>{eq.equipmentname} ({qty} × {displayHoursText}h{hours===0 ? ' (ước tính)' : ''})</span>
                                      <span>{formatPrice(total)} ₫</span>
                                    </div>
                                  );
                                })}
                            </div>
                          )}
                            <div className="border-t border-white/20 pt-2">
                              <div className="flex justify-between text-lg font-bold">
                                <span>Tổng cộng</span>
                                <span>{formatPrice((()=>{ if(!selectedRoomToUse) return 0; const roomUnit=parseFloat(selectedRoomToUse.price); const roomTotal=roomUnit*quantity*displayHours; const eqTotal=Object.entries(selectedEquipments).reduce((sum,[equipmentId,qty])=>{ const eq=selectedRoomToUse.equipments.find(e=>e.equipmentid===Number(equipmentId)); if(!eq || !(eq as any).price) return sum; const unit=parseFloat((eq as any).price); return sum + unit*(qty||0)*displayHours; },0); return roomTotal+eqTotal; })())} ₫</span>
                          </div>
                        </div>
                            </div>
                          </div>

                            <button
                          type="submit"
                          disabled={bookingLoading}
                          className="w-full bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {bookingLoading ? 'Đang xử lý...' : 'Tiếp tục'}
                            </button>
                      </form>
                          </div>
                        </div>
                      </div>
                </div>
            </section>
          )}

          {/* Confirmation */}
          {step === 2 && selectedBooking && (
            <section className="py-12">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="text-green-500 text-6xl mb-6">
                      <CheckCircle className="w-16 h-16 mx-auto" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Đặt phòng thành công!</h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Booking ID: <span className="font-bold text-[#667EEA]">#{selectedBooking.bookingid}</span>
                    </p>
                    <p className="text-gray-600 mb-8">
                      Chúng tôi sẽ xác nhận booking của bạn trong thời gian sớm nhất.
                    </p>
                    <button
                      onClick={handleCreateInvoice}
                      disabled={bookingLoading}
                      className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                    >
                      {bookingLoading ? 'Đang tạo hóa đơn...' : 'Tạo hóa đơn'}
                    </button>
                  </div>
                              </div>
                              </div>
            </section>
          )}

          {step === 3 && selectedInvoice && (
            <section className="py-12">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-5xl mx-auto">
                  <InvoiceDetail
                    invoiceId={selectedInvoice.invoiceId}
                    createdAt={selectedInvoice.created_at}
                    status={selectedInvoice.status}
                    items={selectedInvoice.items as any}
                    totalAmount={selectedInvoice.totalAmount}
                    qrUrl={selectedInvoice.qrUrl || undefined}
                    bookingTime={{ start: selectedBooking?.starttime, end: selectedBooking?.endtime }}
                    room={selectedRoomToUse as any}
                  />
                  <div className="flex justify-center gap-4 mt-6">
                    <Link href="/views/profile" className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg">Xem profile</Link>
                    <Link href="/views/studios" className="border-2 border-[#667EEA] text-[#667EEA] px-6 py-3 rounded-xl font-semibold hover:bg-[#667EEA] hover:text-white">Đặt phòng khác</Link>
                  </div>
                </div>
              </div>
            </section>
          )}
      </StaggeredSections>

      <ScrollToTop />
      <Footer />
      </div>
    </PageTransition>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingPageContent />
    </Suspense>
  );
}