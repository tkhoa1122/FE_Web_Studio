'use client';
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, User, Building } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { PageTransition } from '../../components/common/PageTransition';
import { StaggeredSections } from '../../components/common/StaggeredAnimation';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Địa chỉ',
      content: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Điện thoại',
      content: '0909 123 456',
      link: 'tel:0909123456',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@studio.com',
      link: 'mailto:info@studio.com',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Clock,
      title: 'Giờ làm việc',
      content: 'Thứ 2 - Chủ nhật: 8:00 - 22:00',
      color: 'from-orange-500 to-amber-500'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
      <Header />

      <StaggeredSections staggerDelay={150}>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Hãy để lại thông tin và chúng tôi sẽ liên hệ trong thời gian sớm nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 relative z-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className={`bg-gradient-to-br ${info.color} p-4 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform`}>
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-600 hover:text-[#667EEA] transition-colors"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-600">{info.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-transparent">
                Gửi tin nhắn cho chúng tôi
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Điền thông tin vào form bên dưới và chúng tôi sẽ phản hồi trong vòng 24 giờ.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 mr-2 text-[#667EEA]" />
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none transition-colors"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 mr-2 text-[#667EEA]" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 mr-2 text-[#667EEA]" />
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none transition-colors"
                      placeholder="0909 123 456"
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Building className="w-4 h-4 mr-2 text-[#667EEA]" />
                      Công ty
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none transition-colors"
                      placeholder="Tên công ty"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 mr-2 text-[#667EEA]" />
                    Tiêu đề *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none transition-colors"
                    placeholder="Tiêu đề tin nhắn"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Nội dung *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667EEA] focus:outline-none transition-colors resize-none"
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Gửi tin nhắn</span>
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Tại sao chọn chúng tôi?
                </h3>
                <ul className="space-y-4">
                  {[
                    'Studio chuyên nghiệp với thiết bị hiện đại',
                    'Đội ngũ hỗ trợ nhiệt tình 24/7',
                    'Giá cả cạnh tranh, ưu đãi hấp dẫn',
                    'Không gian rộng rãi, thoáng mát',
                    'Dễ dàng đặt lịch online',
                    'Hỗ trợ tư vấn miễn phí'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="bg-gradient-to-br from-[#667EEA] to-[#764BA2] p-1 rounded-full mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Google Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Google Map sẽ được tích hợp tại đây</p>
                    <p className="text-sm text-gray-500 mt-2">123 Nguyễn Huệ, Quận 1, TP.HCM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-transparent">
              Câu hỏi thường gặp
            </h2>
            <p className="text-gray-600 text-lg">
              Những câu hỏi phổ biến từ khách hàng
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Làm thế nào để đặt lịch studio?',
                a: 'Bạn có thể đặt lịch trực tuyến qua website hoặc liên hệ trực tiếp với chúng tôi qua hotline 0909 123 456.'
              },
              {
                q: 'Studio có những thiết bị gì?',
                a: 'Chúng tôi có đầy đủ thiết bị chuyên nghiệp: máy ảnh, đèn chiếu sáng, green screen, hệ thống âm thanh và nhiều phụ kiện khác.'
              },
              {
                q: 'Có chính sách hủy lịch không?',
                a: 'Hủy trước 48h: hoàn lại 70% cọc. Hủy sau 48h: không hoàn cọc.'
              },
              {
                q: 'Studio có hỗ trợ chụp ảnh không?',
                a: 'Chúng tôi có thể hỗ trợ kỹ thuật viên và photographer với chi phí bổ sung.'
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-gray-50 rounded-xl p-6 group hover:bg-gray-100 transition-colors"
              >
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-[#667EEA] transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      </StaggeredSections>

      <Footer />
      </div>
    </PageTransition>
  );
}

