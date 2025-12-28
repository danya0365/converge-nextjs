// Define your interfaces and types here
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

export interface PricingFeature {
  id: string;
  name: string;
  description: string;
  plans: string[]; // plan IDs that include this feature
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    basic: boolean | string;
    pro: boolean | string;
    advanced: boolean | string;
    enterprise: boolean | string;
  }[];
}

export interface PricingViewModel {
  plans: PricingPlan[];
  faqs: FAQ[];
  comparisonFeatures: ComparisonFeature[];
}

export interface PricingRepository {
  getPlans(): Promise<PricingPlan[]>;
  getFAQs(): Promise<FAQ[]>;
  getComparisonFeatures(): Promise<ComparisonFeature[]>;
}

/**
 * ✅ Default mock implementation. Replace with real repository when ready.
 */
class MockPricingRepository implements PricingRepository {
  async getPlans(): Promise<PricingPlan[]> {
    return [
      {
        id: "basic",
        name: "Basic",
        price: "฿990",
        priceAmount: 990,
        period: "/เดือน",
        description: "เหมาะสำหรับธุรกิจขนาดเล็กที่เริ่มต้น",
        features: [
          "Unified Inbox",
          "เชื่อมต่อได้สูงสุด 3 ช่องทาง",
          "ระบบอัตโนมัติพื้นฐาน",
          "1 ผู้ใช้งาน",
          "แชทได้สูงสุด 1,000 ข้อความ/เดือน",
          "รายงานพื้นฐาน",
          "อีเมลสนับสนุน",
          "ฐานความรู้ออนไลน์",
        ],
        highlighted: false,
        cta: "เริ่มใช้งาน Basic",
      },
      {
        id: "pro",
        name: "Pro",
        price: "฿1,190",
        priceAmount: 1190,
        period: "/เดือน",
        description: "เหมาะสำหรับธุรกิจที่กำลังเติบโต",
        features: [
          "ทุกอย่างใน Basic",
          "เชื่อมต่อได้สูงสุด 5 ช่องทาง",
          "Analytics Dashboard",
          "3 ผู้ใช้งาน",
          "แชทได้สูงสุด 5,000 ข้อความ/เดือน",
          "Team Collaboration",
          "Custom Tags & Labels",
          "Message Templates",
          "Quick Replies",
          "Priority Email Support",
        ],
        highlighted: true,
        cta: "เริ่มใช้งาน Pro",
      },
      {
        id: "advanced",
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
          "Advanced Analytics & Reports",
          "Custom Integrations",
          "API Access",
          "Priority Support (ตอบภายใน 4 ชม.)",
          "Dedicated Account Manager",
        ],
        highlighted: false,
        cta: "เริ่มใช้งาน Advanced",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: "ติดต่อเรา",
        priceAmount: 0,
        period: "",
        description: "โซลูชันแบบครบวงจรสำหรับองค์กรขนาดใหญ่",
        features: [
          "ทุกอย่างใน Advanced",
          "แชทได้ไม่จำกัด",
          "ผู้ใช้งานไม่จำกัด",
          "ช่องทางเชื่อมต่อไม่จำกัด",
          "AI Agent ไม่จำกัด",
          "Custom AI Training",
          "White-label Solution",
          "On-premise Deployment (ตัวเลือก)",
          "Custom Development",
          "SLA 99.9% Uptime",
          "24/7 Premium Support",
          "Dedicated Success Team",
          "Custom Contract & Billing",
        ],
        highlighted: false,
        cta: "ติดต่อฝ่ายขาย",
      },
    ];
  }

  async getFAQs(): Promise<FAQ[]> {
    return [
      {
        id: "1",
        question: "จะเปลี่ยน plan ได้ไหม?",
        answer:
          "ได้ครับ คุณสามารถอัพเกรดหรือดาวน์เกรด plan ได้ตลอดเวลา ค่าใช้จ่ายจะถูกคำนวณตามสัดส่วนการใช้งานอัตโนมัติ (Prorated)",
      },
      {
        id: "2",
        question: "ถ้าข้อความเกินจำนวนที่กำหนดจะเป็นอย่างไร?",
        answer:
          "ระบบจะแจ้งเตือนเมื่อใกล้ถึงลิมิต และคุณสามารถเลือกซื้อ add-on เพิ่มเติมหรืออัพเกรด plan ได้ทันที ไม่มีการตัดบริการกลางเดือน",
      },
      {
        id: "3",
        question: "มีช่วงทดลองใช้ฟรีไหม?",
        answer:
          "มีครับ ทุก plan มีช่วงทดลองใช้ฟรี 14 วัน ไม่ต้องใส่บัตรเครดิต ใช้ได้ครบฟีเจอร์ตาม plan ที่เลือก",
      },
      {
        id: "4",
        question: "วิธีการชำระเงินมีอะไรบ้าง?",
        answer:
          "รองรับบัตรเครดิต/เดบิต, โอนเงินผ่านธนาคาร, พร้อมเพย์ และสำหรับ Enterprise สามารถทำ Invoice และโอนชำระได้",
      },
      {
        id: "5",
        question: "สามารถยกเลิกได้ทุกเมื่อไหม?",
        answer:
          "ได้ครับ ไม่มีข้อผูกมัด สามารถยกเลิกได้ทุกเมื่อ โดยจะยังใช้งานได้จนครบรอบบิล จะไม่มีการเรียกเก็บเงินในรอบถัดไป",
      },
      {
        id: "6",
        question: "ถ้าต้องการเพิ่มผู้ใช้งานเกินกำหนด?",
        answer:
          "สามารถซื้อ user เพิ่มได้ในราคา ฿390/user/เดือน สำหรับ Basic และ Pro, ฿590/user/เดือน สำหรับ Advanced หรืออัพเกรด plan ที่รองรับผู้ใช้มากขึ้น",
      },
      {
        id: "7",
        question: "Enterprise plan ต่างจาก plan อื่นอย่างไร?",
        answer:
          "Enterprise มีความยืดหยุ่นสูง รองรับการปรับแต่งเฉพาะ (Custom) มี SLA รับประกัน, ทีมดูแลเฉพาะ, สามารถติดตั้ง on-premise ได้ และมีการฝึกอบรมทีมงาน",
      },
      {
        id: "8",
        question: "AI Agent คิดค่าใช้จ่ายอย่างไร?",
        answer:
          "Advanced plan มาพร้อม 1,000 ข้อความ AI ฟรี/เดือน หากเกินจะคิดเพิ่ม ฿0.50/ข้อความ สำหรับ Enterprise จะมีแพ็กเกจพิเศษตามการใช้งาน",
      },
    ];
  }

  async getComparisonFeatures(): Promise<ComparisonFeature[]> {
    return [
      {
        category: "การเชื่อมต่อช่องทาง",
        features: [
          {
            name: "จำนวนช่องทางที่เชื่อมต่อได้",
            basic: "3 ช่องทาง",
            pro: "5 ช่องทาง",
            advanced: "ไม่จำกัด",
            enterprise: "ไม่จำกัด",
          },
          {
            name: "Facebook Messenger",
            basic: true,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Instagram Direct",
            basic: true,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "LINE Official Account",
            basic: true,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "WhatsApp Business",
            basic: false,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Website Live Chat",
            basic: true,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "TikTok Shop",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Shopee Chat",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Lazada Chat",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
        ],
      },
      {
        category: "การใช้งาน",
        features: [
          {
            name: "จำนวนผู้ใช้งาน",
            basic: "1 คน",
            pro: "3 คน",
            advanced: "10 คน",
            enterprise: "ไม่จำกัด",
          },
          {
            name: "ข้อความต่อเดือน",
            basic: "1,000",
            pro: "5,000",
            advanced: "20,000",
            enterprise: "ไม่จำกัด",
          },
          {
            name: "ประวัติการสนทนา",
            basic: "6 เดือน",
            pro: "1 ปี",
            advanced: "3 ปี",
            enterprise: "ไม่จำกัด",
          },
        ],
      },
      {
        category: "ฟีเจอร์หลัก",
        features: [
          {
            name: "Unified Inbox",
            basic: true,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Message Templates",
            basic: false,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Quick Replies",
            basic: false,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Auto-reply",
            basic: "พื้นฐาน",
            pro: "ขั้นสูง",
            advanced: "ขั้นสูง",
            enterprise: "Custom",
          },
          {
            name: "Team Collaboration",
            basic: false,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Internal Notes",
            basic: false,
            pro: true,
            advanced: true,
            enterprise: true,
          },
        ],
      },
      {
        category: "ระบบอัตโนมัติ",
        features: [
          {
            name: "Auto-welcome Message",
            basic: true,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Auto-assignment",
            basic: false,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Flow Builder",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
          {
            name: "AI Chatbot",
            basic: false,
            pro: false,
            advanced: "1,000 ข้อความ/เดือน",
            enterprise: "ไม่จำกัด",
          },
          {
            name: "Custom AI Training",
            basic: false,
            pro: false,
            advanced: false,
            enterprise: true,
          },
        ],
      },
      {
        category: "การตลาด",
        features: [
          {
            name: "Broadcast Campaign",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Audience Segmentation",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Campaign Analytics",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
        ],
      },
      {
        category: "รายงานและการวิเคราะห์",
        features: [
          {
            name: "Basic Reports",
            basic: true,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Analytics Dashboard",
            basic: false,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Advanced Reports",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Custom Reports",
            basic: false,
            pro: false,
            advanced: false,
            enterprise: true,
          },
          {
            name: "Export Data",
            basic: false,
            pro: "CSV",
            advanced: "CSV, Excel, PDF",
            enterprise: "ทุกรูปแบบ",
          },
        ],
      },
      {
        category: "การบูรณาการ",
        features: [
          {
            name: "E-commerce Integration",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
          {
            name: "CRM Integration",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
          {
            name: "API Access",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Webhooks",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Custom Integration",
            basic: false,
            pro: false,
            advanced: false,
            enterprise: true,
          },
        ],
      },
      {
        category: "การสนับสนุน",
        features: [
          {
            name: "Knowledge Base",
            basic: true,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Email Support",
            basic: true,
            pro: "Priority",
            advanced: "Priority",
            enterprise: "24/7",
          },
          {
            name: "Live Chat Support",
            basic: false,
            pro: true,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Phone Support",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Dedicated Account Manager",
            basic: false,
            pro: false,
            advanced: true,
            enterprise: true,
          },
          {
            name: "Training & Onboarding",
            basic: false,
            pro: false,
            advanced: "Online",
            enterprise: "Online + On-site",
          },
          {
            name: "SLA",
            basic: false,
            pro: false,
            advanced: false,
            enterprise: "99.9%",
          },
        ],
      },
    ];
  }
}

/**
 * Presenter for Pricing page
 * Follows Clean Architecture with proper separation of concerns
 */
export class PricingPresenter {
  constructor(private readonly repository: PricingRepository) {}

  async getViewModel(): Promise<PricingViewModel> {
    const [plans, faqs, comparisonFeatures] = await Promise.all([
      this.repository.getPlans(),
      this.repository.getFAQs(),
      this.repository.getComparisonFeatures(),
    ]);

    return {
      plans,
      faqs,
      comparisonFeatures,
    };
  }

  async generateMetadata() {
    return {
      title: "ราคาและแผนบริการ - Converge",
      description:
        "เลือกแผนที่เหมาะกับธุรกิจของคุณ เริ่มต้นฟรี 14 วัน ไม่ต้องใส่บัตรเครดิต แผน Basic ฿990/เดือน, Pro ฿1,190/เดือน, Advanced ฿4,490/เดือน และ Enterprise แบบ Custom",
    };
  }
}

/**
 * Factory for creating PricingPresenter instances
 * ✅ Inject repository here (mock, Supabase, REST, etc.)
 */
export class PricingPresenterFactory {
  static async createServer(): Promise<PricingPresenter> {
    // TODO: Replace Mock repository with real repository resolved from server container
    const repository = new MockPricingRepository();
    return new PricingPresenter(repository);
  }

  static createClient(): PricingPresenter {
    // TODO: Replace Mock repository with client-side repository implementation when ready
    const repository = new MockPricingRepository();
    return new PricingPresenter(repository);
  }
}
