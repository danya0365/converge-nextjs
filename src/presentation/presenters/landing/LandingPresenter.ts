// Define your interfaces and types here
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

export interface Channel {
  id: string;
  name: string;
  logo: string;
  description: string;
  available: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceAmount: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Stats {
  users: string;
  messages: string;
  channels: string;
  satisfaction: string;
}

export interface LandingViewModel {
  features: Feature[];
  channels: Channel[];
  pricingPlans: PricingPlan[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  stats: Stats;
}

export interface LandingRepository {
  getFeatures(): Promise<Feature[]>;
  getChannels(): Promise<Channel[]>;
  getPricingPlans(): Promise<PricingPlan[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getFAQs(): Promise<FAQ[]>;
  getStats(): Promise<Stats>;
}

/**
 * ✅ Default mock implementation. Replace with real repository when ready.
 */
class MockLandingRepository implements LandingRepository {
  async getFeatures(): Promise<Feature[]> {
    return [
      {
        id: "1",
        title: "Unified Inbox",
        description: "รวมแชทจากทุกช่องทางในที่เดียว ไม่ต้องเปิดหลายแอป",
        icon: "💬",
        benefits: [
          "ตอบข้อความจากทุกช่องทางในที่เดียว",
          "ไม่พลาดข้อความสำคัญจากลูกค้า",
          "ประหยัดเวลาในการสลับแอป",
        ],
      },
      {
        id: "2",
        title: "AI Chatbot",
        description: "AI ตอบคำถามอัตโนมัติ 24/7 ลดภาระทีมงาน",
        icon: "🤖",
        benefits: [
          "ตอบคำถามทันทีแม้นอกเวลาทำงาน",
          "เรียนรู้จากข้อมูลธุรกิจของคุณ",
          "ส่งต่อทีมงานเมื่อจำเป็น",
        ],
      },
      {
        id: "3",
        title: "Flow Builder",
        description: "สร้างระบบอัตโนมัติแบบ No-Code ง่ายๆ ด้วย Drag & Drop",
        icon: "🔄",
        benefits: [
          "สร้าง workflow อัตโนมัติไม่ต้องเขียนโค้ด",
          "ประหยัดเวลาในงานซ้ำๆ",
          "ปรับแต่งได้ตามความต้องการ",
        ],
      },
      {
        id: "4",
        title: "Analytics",
        description: "วิเคราะห์ข้อมูลแบบ Real-time ตัดสินใจด้วยข้อมูล",
        icon: "📊",
        benefits: [
          "ดูสถิติการสนทนาแบบ real-time",
          "วัดประสิทธิภาพทีมงาน",
          "คาดการณ์แนวโน้มลูกค้า",
        ],
      },
      {
        id: "5",
        title: "Broadcast",
        description: "ส่งแคมเปญการตลาดแบบกำหนดกลุ่มเป้าหมาย",
        icon: "📢",
        benefits: [
          "ส่งข้อความถึงกลุ่มเป้าหมายที่เหมาะสม",
          "กำหนดเวลาส่งล่วงหน้า",
          "วัดผลแคมเปญได้ทันที",
        ],
      },
      {
        id: "6",
        title: "Team Collaboration",
        description: "ทำงานร่วมกันเป็นทีม มอบหมายงานได้อย่างมีระบบ",
        icon: "👥",
        benefits: [
          "มอบหมายแชทให้ทีมงานที่เหมาะสม",
          "แสดงสถานะออนไลน์ของทีม",
          "เพิ่มโน้ตภายในให้เพื่อนร่วมงาน",
        ],
      },
    ];
  }

  async getChannels(): Promise<Channel[]> {
    return [
      {
        id: "1",
        name: "Facebook Messenger",
        logo: "🔵",
        description: "รับ-ส่งข้อความจาก Facebook Page",
        available: true,
      },
      {
        id: "2",
        name: "Instagram Direct",
        logo: "📷",
        description: "จัดการข้อความจาก Instagram",
        available: true,
      },
      {
        id: "3",
        name: "LINE Official Account",
        logo: "💚",
        description: "เชื่อมต่อ LINE OA ของคุณ",
        available: true,
      },
      {
        id: "4",
        name: "WhatsApp Business",
        logo: "💬",
        description: "รองรับ WhatsApp Business API",
        available: true,
      },
      {
        id: "5",
        name: "TikTok Shop",
        logo: "🎵",
        description: "จัดการแชทจาก TikTok Shop",
        available: true,
      },
      {
        id: "6",
        name: "Shopee Chat",
        logo: "🛍️",
        description: "ตอบแชทจาก Shopee ได้ทันที",
        available: true,
      },
      {
        id: "7",
        name: "Lazada Chat",
        logo: "🛒",
        description: "รวมแชท Lazada ไว้ที่เดียว",
        available: true,
      },
      {
        id: "8",
        name: "Website Live Chat",
        logo: "🌐",
        description: "วิดเจ็ตแชทสำหรับเว็บไซต์",
        available: true,
      },
    ];
  }

  async getPricingPlans(): Promise<PricingPlan[]> {
    return [
      {
        id: "1",
        name: "Basic",
        price: "฿990",
        priceAmount: 990,
        period: "/เดือน",
        description: "เหมาะสำหรับธุรกิจขนาดเล็ก",
        features: [
          "Unified Inbox",
          "เชื่อมต่อได้สูงสุด 3 ช่องทาง",
          "ระบบอัตโนมัติพื้นฐาน",
          "1 ผู้ใช้งาน",
          "แชทได้สูงสุด 1,000 ข้อความ/เดือน",
          "รายงานพื้นฐาน",
        ],
        highlighted: false,
        cta: "เริ่มใช้งาน",
      },
      {
        id: "2",
        name: "Pro",
        price: "฿1,190",
        priceAmount: 1190,
        period: "/เดือน",
        description: "เหมาะสำหรับธุรกิจขนาดกลาง",
        features: [
          "ทุกอย่างใน Basic",
          "เชื่อมต่อได้สูงสุด 5 ช่องทาง",
          "Analytics Dashboard",
          "3 ผู้ใช้งาน",
          "แชทได้สูงสุด 5,000 ข้อความ/เดือน",
          "Team Collaboration",
          "Custom Tags & Labels",
        ],
        highlighted: true,
        cta: "เริ่มใช้งาน",
      },
      {
        id: "3",
        name: "Advanced",
        price: "฿4,490",
        priceAmount: 4490,
        period: "/เดือน",
        description: "เหมาะสำหรับธุรกิจที่ต้องการฟีเจอร์ครบครัน",
        features: [
          "ทุกอย่างใน Pro",
          "เชื่อมต่อได้ไม่จำกัด",
          "Advanced Flow Builder",
          "AI Agent (1,000 ข้อความฟรี/เดือน)",
          "Broadcast Campaign",
          "10 ผู้ใช้งาน",
          "แชทได้สูงสุด 20,000 ข้อความ/เดือน",
          "Advanced Analytics",
          "Priority Support",
        ],
        highlighted: false,
        cta: "เริ่มใช้งาน",
      },
      {
        id: "4",
        name: "Enterprise",
        price: "ติดต่อเรา",
        priceAmount: 0,
        period: "",
        description: "สำหรับองค์กรขนาดใหญ่",
        features: [
          "ทุกอย่างใน Advanced",
          "แชทได้ไม่จำกัด",
          "ผู้ใช้งานไม่จำกัด",
          "Dedicated Account Manager",
          "Custom Integration",
          "On-premise Deployment (ตัวเลือก)",
          "SLA 99.9%",
          "24/7 Premium Support",
        ],
        highlighted: false,
        cta: "ติดต่อฝ่ายขาย",
      },
    ];
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return [
      {
        id: "1",
        name: "คุณสมชาย ใจดี",
        role: "CEO",
        company: "Beauty Shop Online",
        avatar: "👨‍💼",
        content:
          "ใช้ Converge แล้วตอบแชทลูกค้าได้เร็วขึ้นมาก ไม่ต้องเปิดหลายแอปแล้ว AI ช่วยตอบคำถามพื้นฐานได้ ทีมงานมีเวลาโฟกัสกับลูกค้า VIP มากขึ้น",
        rating: 5,
      },
      {
        id: "2",
        name: "คุณวิไล รักษ์ลูกค้า",
        role: "Customer Service Manager",
        company: "Fashion Hub",
        avatar: "👩‍💼",
        content:
          "Flow Builder ช่วยให้เราสร้างระบบอัตโนมัติได้ง่ายมาก ไม่ต้องใช้โปรแกรมเมอร์ ลดเวลาในการตอบคำถามซ้ำๆ ได้มากกว่า 60%",
        rating: 5,
      },
      {
        id: "3",
        name: "คุณประยุทธ์ ขายดี",
        role: "Sales Director",
        company: "Tech Gadget Store",
        avatar: "👨‍💻",
        content:
          "Broadcast Campaign ช่วยให้เราส่งโปรโมชันได้แม่นยำขึ้น แบ่งกลุ่มลูกค้าได้ตามพฤติกรรม ยอดขายเพิ่มขึ้น 40% ในเดือนแรก",
        rating: 5,
      },
      {
        id: "4",
        name: "คุณสุดา วิเคราะห์ดี",
        role: "Marketing Manager",
        company: "Cosmetic Paradise",
        avatar: "👩‍💼",
        content:
          "Analytics ช่วยให้เราเข้าใจลูกค้ามากขึ้น รู้ว่าช่องทางไหนมีการตอบสนองดี เวลาไหนลูกค้าแชทเยอะ วางแผนทีมงานได้ดีขึ้น",
        rating: 5,
      },
    ];
  }

  async getFAQs(): Promise<FAQ[]> {
    return [
      {
        id: "1",
        question: "Converge คืออะไร?",
        answer:
          "Converge คือแพลตฟอร์มรวมแชทและ AI Chatbot สำหรับธุรกิจ ที่ช่วยให้คุณจัดการข้อความจากทุกช่องทาง เช่น Facebook, Instagram, LINE, WhatsApp ไว้ในที่เดียว พร้อมระบบอัตโนมัติและ AI ที่ช่วยลดภาระทีมงาน",
      },
      {
        id: "2",
        question: "รองรับช่องทางการแชทอะไรบ้าง?",
        answer:
          "ปัจจุบันรองรับ Facebook Messenger, Instagram Direct, LINE OA, WhatsApp Business, TikTok Shop, Shopee Chat, Lazada Chat และ Website Live Chat Widget",
      },
      {
        id: "3",
        question: "ต้องติดตั้งอะไรเพิ่มไหม?",
        answer:
          "ไม่ต้องติดตั้งอะไรเลย ใช้งานผ่านเว็บเบราว์เซอร์ได้ทันที รองรับทั้งคอมพิวเตอร์และมือถือ",
      },
      {
        id: "4",
        question: "AI Chatbot ทำงานอย่างไร?",
        answer:
          "AI Chatbot ของเราใช้เทคโนโลยี AI ขั้นสูง เรียนรู้จากข้อมูลธุรกิจของคุณ สามารถตอบคำถามพื้นฐาน แนะนำสินค้า และส่งต่อให้ทีมงานเมื่อจำเป็น ทำงาน 24/7 ไม่มีวันหยุด",
      },
      {
        id: "5",
        question: "มีระยะเวลาทดลองใช้ฟรีไหม?",
        answer:
          "มี! เรามีช่วงทดลองใช้ฟรี 14 วัน ไม่ต้องใส่บัตรเครดิต ใช้ได้เต็มฟีเจอร์ทุกอย่าง",
      },
      {
        id: "6",
        question: "สามารถเปลี่ยน plan ได้ไหม?",
        answer:
          "ได้! คุณสามารถอัพเกรดหรือดาวน์เกรด plan ได้ตลอดเวลา ค่าใช้จ่ายจะถูกปรับตามสัดส่วนอัตโนมัติ",
      },
      {
        id: "7",
        question: "ข้อมูลปลอดภัยไหม?",
        answer:
          "ปลอดภัย 100% เราใช้การเข้ารหัสระดับธนาคาร มาตรฐาน SSL/TLS และเก็บข้อมูลบน server ที่ได้มาตรฐาน ISO 27001 พร้อม backup ทุกวัน",
      },
      {
        id: "8",
        question: "มีการสนับสนุนภาษาไทยไหม?",
        answer:
          "มี! ระบบรองรับภาษาไทยเต็มรูปแบบ ทั้งหน้าจอการใช้งาน เอกสาร และทีมสนับสนุนก็พูดภาษาไทย",
      },
    ];
  }

  async getStats(): Promise<Stats> {
    return {
      users: "10,000+",
      messages: "5M+",
      channels: "8",
      satisfaction: "98%",
    };
  }
}

/**
 * Presenter for Landing page
 * Follows Clean Architecture with proper separation of concerns
 */
export class LandingPresenter {
  constructor(private readonly repository: LandingRepository) {}

  async getViewModel(): Promise<LandingViewModel> {
    const [features, channels, pricingPlans, testimonials, faqs, stats] =
      await Promise.all([
        this.repository.getFeatures(),
        this.repository.getChannels(),
        this.repository.getPricingPlans(),
        this.repository.getTestimonials(),
        this.repository.getFAQs(),
        this.repository.getStats(),
      ]);

    return {
      features,
      channels,
      pricingPlans,
      testimonials,
      faqs,
      stats,
    };
  }

  async generateMetadata() {
    return {
      title: "Converge - ระบบรวมแชทและ AI Chatbot สำหรับธุรกิจ",
      description:
        "รวมทุกช่องทางการแชทในที่เดียว Facebook, Instagram, LINE, WhatsApp, TikTok, Shopee, Lazada พร้อม AI ตอบอัตโนมัติ 24/7 เพิ่มยอดขายและลดต้นทุนบริการ",
    };
  }
}

/**
 * Factory for creating LandingPresenter instances
 * ✅ Inject repository here (mock, Supabase, REST, etc.)
 */
export class LandingPresenterFactory {
  static async createServer(): Promise<LandingPresenter> {
    // TODO: Replace Mock repository with real repository resolved from server container
    const repository = new MockLandingRepository();
    return new LandingPresenter(repository);
  }

  static createClient(): LandingPresenter {
    // TODO: Replace Mock repository with client-side repository implementation when ready
    const repository = new MockLandingRepository();
    return new LandingPresenter(repository);
  }
}
