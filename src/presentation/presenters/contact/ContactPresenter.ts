// Define your interfaces and types here
export interface ContactInfo {
  title: string;
  items: {
    icon: string;
    label: string;
    value: string;
    link?: string;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  subject: string;
}

export interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapUrl: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ContactViewModel {
  contactInfo: ContactInfo[];
  offices: Office[];
  faqs: FAQ[];
}

export interface ContactRepository {
  getContactInfo(): Promise<ContactInfo[]>;
  getOffices(): Promise<Office[]>;
  getFAQs(): Promise<FAQ[]>;
  submitContactForm(data: ContactFormData): Promise<boolean>;
}

/**
 * ✅ Default mock implementation. Replace with real repository when ready.
 */
class MockContactRepository implements ContactRepository {
  async getContactInfo(): Promise<ContactInfo[]> {
    return [
      {
        title: "ติดต่อทีมขาย",
        items: [
          {
            icon: "📧",
            label: "อีเมล",
            value: "sales@converge.co.th",
            link: "mailto:sales@converge.co.th",
          },
          {
            icon: "📞",
            label: "โทรศัพท์",
            value: "02-xxx-xxxx",
            link: "tel:02xxxxxxx",
          },
          {
            icon: "📱",
            label: "LINE",
            value: "@converge",
            link: "https://line.me/R/ti/p/@converge",
          },
        ],
      },
      {
        title: "ฝ่ายสนับสนุน",
        items: [
          {
            icon: "💬",
            label: "Live Chat",
            value: "แชทกับเราได้ทันที",
            link: "#",
          },
          {
            icon: "📧",
            label: "อีเมล",
            value: "support@converge.co.th",
            link: "mailto:support@converge.co.th",
          },
          {
            icon: "📚",
            label: "ศูนย์ช่วยเหลือ",
            value: "help.converge.co.th",
            link: "/help",
          },
        ],
      },
      {
        title: "สื่อสังคมออนไลน์",
        items: [
          {
            icon: "📘",
            label: "Facebook",
            value: "facebook.com/converge",
            link: "https://facebook.com/converge",
          },
          {
            icon: "📷",
            label: "Instagram",
            value: "@converge.official",
            link: "https://instagram.com/converge.official",
          },
          {
            icon: "💼",
            label: "LinkedIn",
            value: "linkedin.com/company/converge",
            link: "https://linkedin.com/company/converge",
          },
        ],
      },
    ];
  }

  async getOffices(): Promise<Office[]> {
    return [
      {
        id: "bangkok",
        name: "สำนักงานใหญ่ กรุงเทพฯ",
        address:
          "เลขที่ 123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
        phone: "02-xxx-xxxx",
        email: "bangkok@converge.co.th",
        hours: "จันทร์-ศุกร์ 9:00-18:00 น.",
        mapUrl: "https://maps.google.com",
      },
      {
        id: "chiangmai",
        name: "สาขาเชียงใหม่",
        address:
          "เลขที่ 456 ถนนนิมมานเหมินท์ ตำบลสุเทพ อำเภอเมือง เชียงใหม่ 50200",
        phone: "053-xxx-xxx",
        email: "chiangmai@converge.co.th",
        hours: "จันทร์-ศุกร์ 9:00-18:00 น.",
        mapUrl: "https://maps.google.com",
      },
    ];
  }

  async getFAQs(): Promise<FAQ[]> {
    return [
      {
        id: "1",
        question: "ติดต่อทีมขายได้อย่างไร?",
        answer:
          "คุณสามารถติดต่อทีมขายได้ทาง อีเมล sales@converge.co.th, โทร 02-xxx-xxxx หรือกรอกฟอร์มด้านล่างนี้ เราจะติดต่อกลับภายใน 24 ชั่วโมง",
      },
      {
        id: "2",
        question: "มีการสาธิตการใช้งานไหม?",
        answer:
          "มีครับ! เราให้บริการ Demo แบบ Live ฟรี ใช้เวลาประมาณ 30-45 นาที คุณสามารถนัดหมายได้ผ่านฟอร์มติดต่อ หรือโทรหาเราโดยตรง",
      },
      {
        id: "3",
        question: "ใช้เวลานานแค่ไหนในการติดตั้ง?",
        answer:
          "การติดตั้งเบื้องต้นใช้เวลาเพียง 5-10 นาที คุณสามารถเริ่มใช้งานได้ทันที สำหรับการ Setup ครบทั้งระบบใช้เวลา 1-2 วัน ขึ้นอยู่กับจำนวนช่องทางที่ต้องการเชื่อมต่อ",
      },
      {
        id: "4",
        question: "มีบริการฝึกอบรมไหม?",
        answer:
          "มีครับ เรามีบริการฝึกอบรมทั้งแบบ Online และ On-site สำหรับแพ็กเกจ Enterprise มีทีม Onboarding เฉพาะช่วยตั้งแต่ติดตั้งจนใช้งานได้",
      },
      {
        id: "5",
        question: "ถ้ามีปัญหาการใช้งานติดต่อไหน?",
        answer:
          "คุณสามารถติดต่อฝ่าย Support ได้ทางอีเมล support@converge.co.th, Live Chat ในระบบ หรือโทร 02-xxx-xxxx (ตัวเลือก 2) เราให้บริการ 24/7 สำหรับลูกค้า Enterprise",
      },
    ];
  }

  async submitContactForm(data: ContactFormData): Promise<boolean> {
    // Mock implementation - in real app, this would call API
    console.log("Submitting contact form:", data);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }
}

/**
 * Presenter for Contact page
 * Follows Clean Architecture with proper separation of concerns
 */
export class ContactPresenter {
  constructor(private readonly repository: ContactRepository) {}

  async getViewModel(): Promise<ContactViewModel> {
    const [contactInfo, offices, faqs] = await Promise.all([
      this.repository.getContactInfo(),
      this.repository.getOffices(),
      this.repository.getFAQs(),
    ]);

    return {
      contactInfo,
      offices,
      faqs,
    };
  }

  async submitContactForm(data: ContactFormData): Promise<boolean> {
    // Validate data
    if (!data.name || !data.email || !data.message) {
      throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("รูปแบบอีเมลไม่ถูกต้อง");
    }

    return this.repository.submitContactForm(data);
  }

  async generateMetadata() {
    return {
      title: "ติดต่อเรา - Converge",
      description:
        "ติดต่อทีมขาย Converge เพื่อขอคำปรึกษา สาธิตการใช้งาน หรือสอบถามข้อมูลเพิ่มเติม โทร 02-xxx-xxxx หรืออีเมล sales@converge.co.th",
    };
  }
}

/**
 * Factory for creating ContactPresenter instances
 * ✅ Inject repository here (mock, Supabase, REST, etc.)
 */
export class ContactPresenterFactory {
  static async createServer(): Promise<ContactPresenter> {
    // TODO: Replace Mock repository with real repository resolved from server container
    const repository = new MockContactRepository();
    return new ContactPresenter(repository);
  }

  static createClient(): ContactPresenter {
    // TODO: Replace Mock repository with client-side repository implementation when ready
    const repository = new MockContactRepository();
    return new ContactPresenter(repository);
  }
}
