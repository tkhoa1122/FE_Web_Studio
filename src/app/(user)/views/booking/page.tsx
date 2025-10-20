'use client';
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Maximize2, 
  Camera, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Info,
  Star,
  Shield,
  Zap,
  Lightbulb,
  Video,
  Mic,
  Package,
  Plus,
  Minus,
  Search
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ScrollToTop from '../../components/common/ScrollToTop';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  price: number;
}

interface BookingDate {
  date: Date;
  available: boolean;
  bookedSlots?: number;
  totalSlots?: number;
}

interface Equipment {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  icon: React.ReactNode;
  available: number;
}

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<{ [key: string]: number }>({});
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [equipmentSearchQuery, setEquipmentSearchQuery] = useState('');
  const [equipmentPage, setEquipmentPage] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const ITEMS_PER_PAGE = 6; // 2 rows x 3 columns

  const steps = [
    { id: 1, title: 'Yêu cầu', icon: <Info className="w-5 h-5" /> },
    { id: 2, title: 'Chọn ngày', icon: <CalendarIcon className="w-5 h-5" /> },
    { id: 3, title: 'Chọn giờ', icon: <Clock className="w-5 h-5" /> },
    { id: 4, title: 'Thiết bị', icon: <Package className="w-5 h-5" /> },
    { id: 5, title: 'Xác nhận', icon: <CheckCircle2 className="w-5 h-5" /> }
  ];

  const areaOptions = [
    { id: 'small', name: '< 50m²', description: 'Phù hợp cho chụp cá nhân' },
    { id: 'medium', name: '50-100m²', description: 'Phù hợp cho nhóm nhỏ' },
    { id: 'large', name: '100-200m²', description: 'Phù hợp cho sự kiện' },
    { id: 'xlarge', name: '> 200m²', description: 'Phù hợp cho sự kiện lớn' }
  ];

  const capacityOptions = [
    { id: '1-5', name: '1-5 người', icon: '👤' },
    { id: '5-10', name: '5-10 người', icon: '👥' },
    { id: '10-20', name: '10-20 người', icon: '👨‍👩‍👧‍👦' },
    { id: '20+', name: '20+ người', icon: '🏢' }
  ];

  const typeOptions = [
    { id: 'photo', name: 'Chụp ảnh', icon: <Camera className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { id: 'video', name: 'Quay phim', icon: <Camera className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
    { id: 'event', name: 'Sự kiện', icon: <Star className="w-6 h-6" />, color: 'from-orange-500 to-red-500' }
  ];

  const locationOptions = [
    { id: 'q1', name: 'Quận 1' },
    { id: 'q3', name: 'Quận 3' },
    { id: 'q7', name: 'Quận 7' },
    { id: 'q10', name: 'Quận 10' },
    { id: 'bt', name: 'Bình Thạnh' }
  ];

  const equipmentCategories = [
    { id: 'all', name: 'Tất cả', icon: <Package className="w-4 h-4" /> },
    { id: 'camera', name: 'Máy ảnh', icon: <Camera className="w-4 h-4" /> },
    { id: 'lighting', name: 'Đèn chiếu sáng', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'audio', name: 'Âm thanh', icon: <Mic className="w-4 h-4" /> },
    { id: 'video', name: 'Video', icon: <Video className="w-4 h-4" /> }
  ];

  const availableEquipment: Equipment[] = [
    {
      id: 'eq1',
      name: 'Canon EOS R5',
      description: 'Máy ảnh full-frame 45MP, quay video 8K',
      price: 500000,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
      category: 'camera',
      icon: <Camera className="w-6 h-6" />,
      available: 3
    },
    {
      id: 'eq2',
      name: 'Sony A7IV',
      description: 'Máy ảnh mirrorless đa năng 33MP',
      price: 450000,
      image: 'https://images.unsplash.com/photo-1606980707986-f3a60eccee3e?w=400',
      category: 'camera',
      icon: <Camera className="w-6 h-6" />,
      available: 5
    },
    {
      id: 'eq3',
      name: 'Godox SL-60W',
      description: 'Đèn LED chuyên nghiệp 60W với nhiệt độ màu điều chỉnh',
      price: 200000,
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
      category: 'lighting',
      icon: <Lightbulb className="w-6 h-6" />,
      available: 8
    },
    {
      id: 'eq4',
      name: 'Aputure 300D',
      description: 'Đèn COB 300W công suất cao',
      price: 350000,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400',
      category: 'lighting',
      icon: <Lightbulb className="w-6 h-6" />,
      available: 4
    },
    {
      id: 'eq5',
      name: 'Nanlite PavoTube',
      description: 'Đèn LED RGB tube với hiệu ứng đa dạng',
      price: 180000,
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
      category: 'lighting',
      icon: <Lightbulb className="w-6 h-6" />,
      available: 6
    },
    {
      id: 'eq6',
      name: 'Rode VideoMic Pro+',
      description: 'Micro shotgun chuyên nghiệp cho video',
      price: 150000,
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400',
      category: 'audio',
      icon: <Mic className="w-6 h-6" />,
      available: 7
    },
    {
      id: 'eq7',
      name: 'Zoom H6',
      description: 'Máy ghi âm 6 kênh chất lượng cao',
      price: 200000,
      image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400',
      category: 'audio',
      icon: <Mic className="w-6 h-6" />,
      available: 3
    },
    {
      id: 'eq8',
      name: 'DJI Ronin-S',
      description: 'Gimbal 3 trục cho máy ảnh DSLR/Mirrorless',
      price: 400000,
      image: 'https://images.unsplash.com/photo-1606503153255-59d723a0ed1a?w=400',
      category: 'video',
      icon: <Video className="w-6 h-6" />,
      available: 4
    },
    {
      id: 'eq9',
      name: 'Blackmagic Pocket 6K',
      description: 'Camera cinema compact quay 6K RAW',
      price: 600000,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
      category: 'video',
      icon: <Video className="w-6 h-6" />,
      available: 2
    },
    {
      id: 'eq10',
      name: 'Canon RF 24-70mm f/2.8',
      description: 'Ống kính zoom đa năng chất lượng cao',
      price: 300000,
      image: 'https://images.unsplash.com/photo-1606094794219-79c3f7c5e285?w=400',
      category: 'camera',
      icon: <Camera className="w-6 h-6" />,
      available: 5
    }
  ];

  // Generate calendar dates
  const generateCalendarDates = (): BookingDate[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const dates: BookingDate[] = [];

    // Add previous month's dates
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      dates.push({ date, available: false });
    }

    // Add current month's dates
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
      // Mock: random availability
      const bookedSlots = Math.floor(Math.random() * 8);
      const totalSlots = 8;
      dates.push({ 
        date, 
        available: !isPast && bookedSlots < totalSlots,
        bookedSlots,
        totalSlots
      });
    }

    return dates;
  };

  const calendarDates = generateCalendarDates();

  const timeSlots: TimeSlot[] = [
    { id: '1', time: '08:00 - 10:00', available: true, price: 300000 },
    { id: '2', time: '10:00 - 12:00', available: true, price: 300000 },
    { id: '3', time: '12:00 - 14:00', available: false, price: 300000 },
    { id: '4', time: '14:00 - 16:00', available: true, price: 350000 },
    { id: '5', time: '16:00 - 18:00', available: true, price: 350000 },
    { id: '6', time: '18:00 - 20:00', available: true, price: 400000 },
    { id: '7', time: '20:00 - 22:00', available: false, price: 400000 },
    { id: '8', time: '22:00 - 24:00', available: true, price: 400000 }
  ];

  const handleTimeSlotToggle = (slotId: string) => {
    if (selectedTimeSlots.includes(slotId)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(id => id !== slotId));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, slotId]);
    }
  };

  const handleEquipmentQuantityChange = (equipmentId: string, change: number) => {
    const equipment = availableEquipment.find(eq => eq.id === equipmentId);
    if (!equipment) return;

    const currentQty = selectedEquipment[equipmentId] || 0;
    const newQty = currentQty + change;

    if (newQty <= 0) {
      const { [equipmentId]: _, ...rest } = selectedEquipment;
      setSelectedEquipment(rest);
    } else if (newQty <= equipment.available) {
      setSelectedEquipment({ ...selectedEquipment, [equipmentId]: newQty });
    }
  };

  const filteredEquipment = availableEquipment.filter(eq => {
    const matchCategory = equipmentFilter === 'all' || eq.category === equipmentFilter;
    const matchSearch = equipmentSearchQuery === '' || 
      eq.name.toLowerCase().includes(equipmentSearchQuery.toLowerCase()) ||
      eq.description.toLowerCase().includes(equipmentSearchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredEquipment.length / ITEMS_PER_PAGE);
  const paginatedEquipment = filteredEquipment.slice(
    (equipmentPage - 1) * ITEMS_PER_PAGE,
    equipmentPage * ITEMS_PER_PAGE
  );

  const handleEquipmentPageChange = (page: number) => {
    setEquipmentPage(page);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const calculateTotal = () => {
    const studioTotal = selectedTimeSlots.reduce((total, slotId) => {
      const slot = timeSlots.find(s => s.id === slotId);
      return total + (slot?.price || 0);
    }, 0);

    const equipmentTotal = Object.entries(selectedEquipment).reduce((total, [equipmentId, quantity]) => {
      const equipment = availableEquipment.find(eq => eq.id === equipmentId);
      return total + ((equipment?.price || 0) * quantity);
    }, 0);

    return studioTotal + equipmentTotal;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const canProceedStep1 = selectedArea && selectedCapacity && selectedType && selectedLocation;
  const canProceedStep2 = selectedDate;
  const canProceedStep3 = selectedTimeSlots.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in slide-in-from-left">
              Đặt lịch Studio
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Chỉ với 4 bước đơn giản, bạn đã có thể đặt studio ưng ý cho dự án của mình
            </p>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Xác nhận nhanh</h3>
                  <p className="text-sm text-white/80">Trong vòng 5 phút</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Thanh toán an toàn</h3>
                  <p className="text-sm text-white/80">Bảo mật 100%</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Star className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Hỗ trợ 24/7</h3>
                  <p className="text-sm text-white/80">Luôn sẵn sàng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 -z-10">
                <div 
                  className="h-full bg-gradient-to-r from-[#667EEA] to-[#764BA2] transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div 
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white shadow-lg scale-110'
                        : 'bg-white text-gray-400 border-2 border-gray-200'
                    }`}
                  >
                    {currentStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    currentStep >= step.id ? 'text-[#667EEA]' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-5xl mx-auto">
            {/* Step 1: Requirements */}
            {currentStep === 1 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-in fade-in slide-in-from-right">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Yêu cầu của bạn</h2>
                <p className="text-gray-600 mb-8">Hãy cho chúng tôi biết bạn cần studio như thế nào</p>

                {/* Area Selection */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <Maximize2 className="w-5 h-5 inline mr-2" />
                    Diện tích studio
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {areaOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedArea(option.id)}
                        className={`p-5 rounded-2xl border-2 transition-all text-left hover:scale-105 ${
                          selectedArea === option.id
                            ? 'border-[#667EEA] bg-gradient-to-br from-[#667EEA]/10 to-[#764BA2]/10 shadow-lg'
                            : 'border-gray-200 hover:border-[#667EEA]/50'
                        }`}
                      >
                        <div className="text-xl font-bold text-gray-900 mb-1">{option.name}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Capacity Selection */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <Users className="w-5 h-5 inline mr-2" />
                    Sức chứa
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {capacityOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedCapacity(option.id)}
                        className={`p-5 rounded-2xl border-2 transition-all text-center hover:scale-105 ${
                          selectedCapacity === option.id
                            ? 'border-[#667EEA] bg-gradient-to-br from-[#667EEA]/10 to-[#764BA2]/10 shadow-lg'
                            : 'border-gray-200 hover:border-[#667EEA]/50'
                        }`}
                      >
                        <div className="text-3xl mb-2">{option.icon}</div>
                        <div className="text-base font-semibold text-gray-900">{option.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type Selection */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <Camera className="w-5 h-5 inline mr-2" />
                    Mục đích sử dụng
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {typeOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedType(option.id)}
                        className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                          selectedType === option.id
                            ? 'border-[#667EEA] shadow-lg'
                            : 'border-gray-200 hover:border-[#667EEA]/50'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center text-white mb-3 mx-auto`}>
                          {option.icon}
                        </div>
                        <div className="text-lg font-semibold text-gray-900">{option.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Selection */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <MapPin className="w-5 h-5 inline mr-2" />
                    Khu vực
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {locationOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedLocation(option.id)}
                        className={`p-4 rounded-xl border-2 transition-all font-semibold hover:scale-105 ${
                          selectedLocation === option.id
                            ? 'border-[#667EEA] bg-gradient-to-br from-[#667EEA]/10 to-[#764BA2]/10 text-[#667EEA]'
                            : 'border-gray-200 text-gray-700 hover:border-[#667EEA]/50'
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {currentStep === 2 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-in fade-in slide-in-from-right">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Chọn ngày</h2>
                <p className="text-gray-600 mb-8">Chọn ngày bạn muốn đặt studio</p>

                {/* Calendar */}
                <div className="max-w-3xl mx-auto">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {currentMonth.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={prevMonth}
                        className="p-2 rounded-lg border-2 border-gray-200 hover:border-[#667EEA] hover:text-[#667EEA] transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextMonth}
                        className="p-2 rounded-lg border-2 border-gray-200 hover:border-[#667EEA] hover:text-[#667EEA] transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Weekday Headers */}
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                      <div key={day} className="text-center font-semibold text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {calendarDates.map((dateInfo, index) => {
                      const isCurrentMonth = dateInfo.date.getMonth() === currentMonth.getMonth();
                      const isSelected = selectedDate?.toDateString() === dateInfo.date.toDateString();
                      const isToday = dateInfo.date.toDateString() === new Date().toDateString();
                      const availabilityPercent = dateInfo.totalSlots 
                        ? ((dateInfo.totalSlots - (dateInfo.bookedSlots || 0)) / dateInfo.totalSlots) * 100 
                        : 100;

                      return (
                        <button
                          key={index}
                          onClick={() => dateInfo.available && isCurrentMonth && setSelectedDate(dateInfo.date)}
                          disabled={!dateInfo.available || !isCurrentMonth}
                          className={`aspect-square p-2 rounded-xl transition-all relative group ${
                            !isCurrentMonth
                              ? 'text-gray-300 cursor-not-allowed'
                              : isSelected
                              ? 'bg-gradient-to-br from-[#667EEA] to-[#764BA2] text-white shadow-xl scale-105 font-bold'
                              : dateInfo.available
                              ? 'bg-white border-2 border-gray-200 hover:border-[#667EEA] hover:scale-105 font-semibold'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                          }`}
                        >
                          <div className="flex flex-col items-center justify-center h-full">
                            <span className={isToday && !isSelected ? 'text-[#667EEA] font-bold' : ''}>
                              {dateInfo.date.getDate()}
                            </span>
                            {isCurrentMonth && dateInfo.available && dateInfo.totalSlots && (
                              <div className="w-full mt-1">
                                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      availabilityPercent > 50 
                                        ? 'bg-green-500' 
                                        : availabilityPercent > 25 
                                        ? 'bg-yellow-500' 
                                        : 'bg-red-500'
                                    }`}
                                    style={{ width: `${availabilityPercent}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Tooltip */}
                          {isCurrentMonth && dateInfo.available && dateInfo.totalSlots && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                              {dateInfo.totalSlots - (dateInfo.bookedSlots || 0)}/{dateInfo.totalSlots} slots trống
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-center space-x-6 mt-8 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gradient-to-br from-[#667EEA] to-[#764BA2] rounded"></div>
                      <span className="text-gray-600">Đã chọn</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded"></div>
                      <span className="text-gray-600">Còn trống</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-100 rounded"></div>
                      <span className="text-gray-600">Đã đầy</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Time Slots */}
            {currentStep === 3 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-in fade-in slide-in-from-right">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Chọn khung giờ</h2>
                <p className="text-gray-600 mb-2">
                  Ngày: <span className="font-semibold text-[#667EEA]">
                    {selectedDate?.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mb-8">Bạn có thể chọn nhiều khung giờ</p>

                {/* Time Slots Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {timeSlots.map(slot => {
                    const isSelected = selectedTimeSlots.includes(slot.id);
                    return (
                      <button
                        key={slot.id}
                        onClick={() => slot.available && handleTimeSlotToggle(slot.id)}
                        disabled={!slot.available}
                        className={`p-6 rounded-2xl border-2 transition-all relative overflow-hidden ${
                          !slot.available
                            ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-50'
                            : isSelected
                            ? 'border-[#667EEA] bg-gradient-to-br from-[#667EEA]/10 to-[#764BA2]/10 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-[#667EEA] hover:scale-105'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white rounded-full p-1">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                        <div className="flex flex-col items-center">
                          <Clock className={`w-8 h-8 mb-3 ${isSelected ? 'text-[#667EEA]' : 'text-gray-400'}`} />
                          <div className="text-lg font-bold text-gray-900 mb-1">{slot.time}</div>
                          <div className={`text-sm font-semibold ${isSelected ? 'text-[#667EEA]' : 'text-gray-600'}`}>
                            {formatPrice(slot.price)} ₫
                          </div>
                          {!slot.available && (
                            <div className="text-xs text-red-500 mt-2 font-medium">Đã được đặt</div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Summary */}
                {selectedTimeSlots.length > 0 && (
                  <div className="bg-gradient-to-br from-[#667EEA]/10 to-[#764BA2]/10 rounded-2xl p-6 border-2 border-[#667EEA]/20">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Tóm tắt đặt lịch</h3>
                    <div className="space-y-2 mb-4">
                      {selectedTimeSlots.map(slotId => {
                        const slot = timeSlots.find(s => s.id === slotId);
                        return slot ? (
                          <div key={slotId} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">⏰ {slot.time}</span>
                            <span className="font-semibold text-gray-900">{formatPrice(slot.price)} ₫</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                    <div className="pt-3 border-t-2 border-[#667EEA]/20 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">Tổng cộng:</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-transparent bg-clip-text">
                        {formatPrice(calculateTotal())} ₫
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Equipment Selection */}
            {currentStep === 4 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-in fade-in slide-in-from-right">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Chọn thiết bị bổ sung</h2>
                <p className="text-gray-600 mb-6">Thêm thiết bị chuyên nghiệp để nâng cao chất lượng sản phẩm (Tùy chọn)</p>

                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm thiết bị theo tên hoặc mô tả..."
                      value={equipmentSearchQuery}
                      onChange={(e) => {
                        setEquipmentSearchQuery(e.target.value);
                        setEquipmentPage(1); // Reset to page 1 when searching
                      }}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none text-gray-900"
                    />
                  </div>
                </div>

                {/* Equipment Categories */}
                <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
                  {equipmentCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setEquipmentFilter(cat.id);
                        setEquipmentPage(1); // Reset to page 1 when filtering
                      }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                        equipmentFilter === cat.id
                          ? 'bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.icon}
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>

                {/* Results Info */}
                <div className="mb-4 text-sm text-gray-600">
                  Hiển thị <span className="font-semibold text-gray-900">{paginatedEquipment.length}</span> / <span className="font-semibold text-gray-900">{filteredEquipment.length}</span> thiết bị
                </div>

                {/* Equipment Grid - 2 rows x 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {paginatedEquipment.map(equipment => {
                    const quantity = selectedEquipment[equipment.id] || 0;
                    return (
                      <div
                        key={equipment.id}
                        className={`rounded-2xl border-2 overflow-hidden transition-all ${
                          quantity > 0
                            ? 'border-[#667EEA] shadow-lg'
                            : 'border-gray-200 hover:border-[#667EEA]/50'
                        }`}
                      >
                        {/* Equipment Image */}
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          <img
                            src={equipment.image}
                            alt={equipment.name}
                            className="w-full h-full object-cover"
                          />
                          {quantity > 0 && (
                            <div className="absolute top-3 right-3 bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-3 py-1 rounded-full text-sm font-bold">
                              x{quantity}
                            </div>
                          )}
                          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                            Còn {equipment.available} chiếc
                          </div>
                        </div>

                        {/* Equipment Info */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{equipment.name}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{equipment.description}</p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-[#667EEA] font-bold text-lg">
                              {formatPrice(equipment.price)} ₫<span className="text-sm font-normal text-gray-500">/giờ</span>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2">
                            <button
                              onClick={() => handleEquipmentQuantityChange(equipment.id, -1)}
                              disabled={quantity === 0}
                              className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#667EEA] hover:text-[#667EEA] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-5 h-5" />
                            </button>
                            <span className="text-lg font-bold text-gray-900 min-w-[3rem] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => handleEquipmentQuantityChange(equipment.id, 1)}
                              disabled={quantity >= equipment.available}
                              className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Empty State */}
                {paginatedEquipment.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Package className="w-16 h-16 mx-auto mb-3 opacity-30" />
                    <p className="text-lg font-medium">Không tìm thấy thiết bị nào</p>
                    <p className="text-sm">Hãy thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    <button
                      onClick={() => handleEquipmentPageChange(equipmentPage - 1)}
                      disabled={equipmentPage === 1}
                      className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-700 hover:border-[#667EEA] hover:text-[#667EEA] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handleEquipmentPageChange(page)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          equipmentPage === page
                            ? 'bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white'
                            : 'border-2 border-gray-200 text-gray-700 hover:border-[#667EEA] hover:text-[#667EEA]'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handleEquipmentPageChange(equipmentPage + 1)}
                      disabled={equipmentPage === totalPages}
                      className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-700 hover:border-[#667EEA] hover:text-[#667EEA] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Selected Equipment Summary */}
                {Object.keys(selectedEquipment).length > 0 && (
                  <div className="bg-gradient-to-br from-[#667EEA]/10 to-[#764BA2]/10 rounded-2xl p-6 border-2 border-[#667EEA]/20">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Package className="w-5 h-5 mr-2 text-[#667EEA]" />
                      Thiết bị đã chọn
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(selectedEquipment).map(([equipmentId, quantity]) => {
                        const equipment = availableEquipment.find(eq => eq.id === equipmentId);
                        if (!equipment) return null;
                        return (
                          <div key={equipmentId} className="flex items-center justify-between bg-white rounded-xl p-4">
                            <div className="flex items-center space-x-3 flex-1">
                              <div className="w-12 h-12 rounded-lg overflow-hidden">
                                <img src={equipment.image} alt={equipment.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{equipment.name}</p>
                                <p className="text-sm text-gray-600">Số lượng: {quantity}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[#667EEA] font-bold">
                                {formatPrice(equipment.price * quantity)} ₫
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatPrice(equipment.price)} ₫ x {quantity}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 pt-4 border-t-2 border-[#667EEA]/20 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">Tổng thiết bị:</span>
                      <span className="text-xl font-bold bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-transparent bg-clip-text">
                        {formatPrice(Object.entries(selectedEquipment).reduce((total, [equipmentId, quantity]) => {
                          const equipment = availableEquipment.find(eq => eq.id === equipmentId);
                          return total + ((equipment?.price || 0) * quantity);
                        }, 0))} ₫
                      </span>
                    </div>
                  </div>
                )}

                {Object.keys(selectedEquipment).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-16 h-16 mx-auto mb-3 opacity-30" />
                    <p>Chưa chọn thiết bị nào. Bạn có thể bỏ qua bước này.</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 5 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-in fade-in slide-in-from-right">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Xác nhận đặt lịch</h2>
                  <p className="text-gray-600">Vui lòng kiểm tra lại thông tin trước khi xác nhận</p>
                </div>

                {/* Booking Summary */}
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Requirements */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-[#667EEA]" />
                      Yêu cầu studio
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Diện tích:</span>
                        <p className="font-semibold text-gray-900">
                          {areaOptions.find(a => a.id === selectedArea)?.name}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Sức chứa:</span>
                        <p className="font-semibold text-gray-900">
                          {capacityOptions.find(c => c.id === selectedCapacity)?.name}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Mục đích:</span>
                        <p className="font-semibold text-gray-900">
                          {typeOptions.find(t => t.id === selectedType)?.name}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Khu vực:</span>
                        <p className="font-semibold text-gray-900">
                          {locationOptions.find(l => l.id === selectedLocation)?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2 text-[#667EEA]" />
                      Ngày & Giờ
                    </h3>
                    <div className="mb-3">
                      <span className="text-gray-600 text-sm">Ngày:</span>
                      <p className="font-semibold text-gray-900">
                        {selectedDate?.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Khung giờ:</span>
                      <div className="space-y-1 mt-1">
                        {selectedTimeSlots.map(slotId => {
                          const slot = timeSlots.find(s => s.id === slotId);
                          return slot ? (
                            <div key={slotId} className="flex items-center justify-between bg-white p-3 rounded-lg">
                              <span className="font-semibold text-gray-900">⏰ {slot.time}</span>
                              <span className="text-[#667EEA] font-semibold">{formatPrice(slot.price)} ₫</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Equipment */}
                  {Object.keys(selectedEquipment).length > 0 && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <Package className="w-5 h-5 mr-2 text-[#667EEA]" />
                        Thiết bị bổ sung
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(selectedEquipment).map(([equipmentId, quantity]) => {
                          const equipment = availableEquipment.find(eq => eq.id === equipmentId);
                          return equipment ? (
                            <div key={equipmentId} className="flex items-center justify-between bg-white p-3 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-lg overflow-hidden">
                                  <img src={equipment.image} alt={equipment.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-900">{equipment.name}</span>
                                  <p className="text-xs text-gray-500">x{quantity}</p>
                                </div>
                              </div>
                              <span className="text-[#667EEA] font-semibold">{formatPrice(equipment.price * quantity)} ₫</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  {/* Total */}
                  <div className="bg-gradient-to-br from-[#667EEA] to-[#764BA2] rounded-2xl p-6 text-white">
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Tổng thời gian:</span>
                        <span className="font-semibold">{selectedTimeSlots.length * 2} giờ</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Phí studio:</span>
                        <span className="font-semibold">
                          {formatPrice(selectedTimeSlots.reduce((total, slotId) => {
                            const slot = timeSlots.find(s => s.id === slotId);
                            return total + (slot?.price || 0);
                          }, 0))} ₫
                        </span>
                      </div>
                      {Object.keys(selectedEquipment).length > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Phí thiết bị:</span>
                          <span className="font-semibold">
                            {formatPrice(Object.entries(selectedEquipment).reduce((total, [equipmentId, quantity]) => {
                              const equipment = availableEquipment.find(eq => eq.id === equipmentId);
                              return total + ((equipment?.price || 0) * quantity);
                            }, 0))} ₫
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="pt-3 border-t-2 border-white/20 flex items-center justify-between text-2xl font-bold">
                      <span>Tổng thanh toán:</span>
                      <span>{formatPrice(calculateTotal())} ₫</span>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-3 text-sm text-gray-600">
                    <input type="checkbox" className="mt-1" id="terms" />
                    <label htmlFor="terms">
                      Tôi đã đọc và đồng ý với <a href="#" className="text-[#667EEA] hover:underline">Điều khoản dịch vụ</a> và <a href="#" className="text-[#667EEA] hover:underline">Chính sách bảo mật</a>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#667EEA] hover:text-[#667EEA]'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Quay lại</span>
              </button>

              {currentStep < 5 ? (
                <button
                  onClick={() => {
                    if (currentStep === 1 && canProceedStep1) setCurrentStep(2);
                    else if (currentStep === 2 && canProceedStep2) setCurrentStep(3);
                    else if (currentStep === 3 && canProceedStep3) setCurrentStep(4);
                    else if (currentStep === 4) setCurrentStep(5); // Equipment step is optional
                  }}
                  disabled={
                    (currentStep === 1 && !canProceedStep1) ||
                    (currentStep === 2 && !canProceedStep2) ||
                    (currentStep === 3 && !canProceedStep3)
                  }
                  className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                    ((currentStep === 1 && canProceedStep1) ||
                    (currentStep === 2 && canProceedStep2) ||
                    (currentStep === 3 && canProceedStep3) ||
                    currentStep === 4)
                      ? 'bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white shadow-lg hover:shadow-xl hover:scale-105'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>{currentStep === 4 ? 'Tiếp tục (Bỏ qua)' : 'Tiếp tục'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  className="flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Xác nhận đặt lịch</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </div>
  );
}

