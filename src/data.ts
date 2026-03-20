import { 
  LayoutDashboard, 
  Users, 
  RefreshCw, 
  ShieldCheck, 
  ClipboardList, 
  AlertCircle,
  Briefcase,
  Database,
  LifeBuoy,
  Zap
} from 'lucide-react';

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  metadata: {
    title: string;
    subtitle: string;
    description: string;
    version: string;
    effectiveDate: string;
    headcount: string;
    milestones: string;
  };
  operatingModel: {
    tiers: any[];
    workstreams: any[];
  };
  orgChart: {
    title: string;
    head: any;
    pm: any;
    teams: any[];
    vacancies?: string[];
  };
  teams: any[];
  smartsales?: {
    title: string;
    assignmentTitle?: string;
    dev: any;
    business: any;
    crmAssignments: any[];
  };
  processes: any[];
  raci: {
    roles: any[];
    sections: any[];
    notes?: string[];
  };
  governance: {
    meetings: any[];
    issues: any[];
    actionPlan: any[];
  };
}

const crmProject: ProjectData = {
  id: 'crm-vib',
  name: 'CRM VIB Dashboard',
  description: 'Hệ thống quản trị quan hệ khách hàng tập trung cho khối bán lẻ',
  icon: LayoutDashboard,
  color: 'emerald',
  metadata: {
    title: "Operating Model & RACI",
    subtitle: "Giai đoạn Post Go-Live",
    description: "Khung vận hành Salesforce CRM — Hypercare → BAU · Cập nhật cơ cấu thực tế",
    version: "v2.0",
    effectiveDate: "Tháng 3/2026",
    headcount: "~45 headcount BTS CRM (confirmed)",
    milestones: "Hypercare đến 31/3 · BAU từ 1/4/2026"
  },
  operatingModel: {
    tiers: [
      {
        id: 'bu',
        label: 'BU',
        subLabel: 'Người dùng được phục vụ',
        color: 'bg-stone-500',
        title: 'Business Units — ~6,000 end-users (RM, PB, SM, WS, Banca, HO, Card Digital DSE...)',
        content: 'Người dùng cuối sử dụng Salesforce CRM trong công việc hàng ngày. BU giao tiếp với BTS CRM qua Support Channel chính thức (Teams/email) và thông qua Business Owner đại diện từng khối (Card, Lending, Deposit, Banca). Không liên hệ trực tiếp SA hay Dev.',
        badges: []
      },
      {
        id: 'l1',
        label: 'LINE 1',
        subLabel: 'First Contact',
        color: 'bg-vib-blue',
        title: 'Support Team — Phan Thị Thương Huyền (Lead) · Lê Thị Diễm My · + Vacancies',
        content: 'Điểm tiếp xúc duy nhất từ BU. Tiếp nhận, phân loại, xử lý FAQs, hướng dẫn sử dụng, dispatch theo nghiệp vụ. Mục tiêu: phản hồi 2h, xử lý L1 trong 4h làm việc.',
        badges: [
          { text: 'Card Digital → Trần Thị Ngọc / Phạm Văn Hà', type: 'emerald' },
          { text: 'Card Physical → Nguyễn Thị Minh Ánh', type: 'emerald' },
          { text: 'Lending → Lê Quỳnh Anh', type: 'emerald' },
          { text: 'Deposit → Huyền (SA dispatch)', type: 'emerald' },
          { text: 'Banca → Đào Thị Thúy Nga (SS, đến 30/6) / Ngô Long Huy QC', type: 'sage' },
          { text: 'C360 → Trần Thị Ngọc', type: 'sage' },
          { text: 'Mkt Cloud → Trần Huyền Trang / Nguyễn Thùy Dung', type: 'olive' },
          { text: 'CR003 BA → Đào Thị Thúy Nga (đến 30/6)', type: 'stone' }
        ]
      },
      {
        id: 'l2a',
        label: 'LINE 2A',
        subLabel: 'Analysis SA & QA',
        color: 'bg-olive-600',
        title: 'SA & QA Team (merged PO) — Trần Linh Chi (Lead) · 12 members',
        content: 'Phân tích root cause, thiết kế giải pháp, viết bug spec, kiểm thử. PO Trang + Dung merge vào team này từ nay để thống nhất backlog và requirement management. Phối hợp với Deloitte về CR003 và technical issues phức tạp.',
        badges: []
      },
      {
        id: 'l2b',
        label: 'LINE 2B',
        subLabel: 'Technical Dev & Ops',
        color: 'bg-emerald-600',
        title: 'Dev & Ops Team — Đoàn Tùng Giang (CRM Dev Lead) · 5 developers · Lý Tú Kiệt (Ops) · + Ngô Long Huy hỗ trợ QC đến 30/6',
        content: 'Code fix, deploy patch, monitoring hệ thống 24/7 (FSC, SFMC, Mulesoft CP4I, integrations). Quản lý release calendar. SmartSales team có 2 đầu mối: Ngô Tấn Bình (Dev) và Phùng Vũ Dung (Nghiệp vụ/PO). Dung, Trang, Nga, Huy tham gia hỗ trợ CRM đến 30/6 rồi back về SmartSales.',
        badges: []
      },
      {
        id: 'l3',
        label: 'LINE 3',
        subLabel: 'Vendor Escalation',
        color: 'bg-stone-600',
        title: 'Deloitte (đến 31/3/2026) → Salesforce Support (từ 1/4)',
        content: 'Issues ngoài khả năng xử lý nội bộ. Deloitte hypercare theo contract. Sau 31/3: Salesforce Premier Support + Solution Architect nội bộ (cần tuyển) làm đầu mối.',
        badges: [],
        warning: '⚠️ Còn ~12 ngày đến 31/3 — cần đẩy nhanh bàn giao run-book và tuyển Solution Architect'
      }
    ],
    workstreams: [
      {
        id: 1,
        title: 'Governance & Điều phối chung',
        color: 'emerald',
        subItems: [
          {
            title: '👑 HEAD CRM (Hiển) — Kiêm nhiệm + CN Thẻ',
            content: '• Phê duyệt chiến lược CRM & roadmap\n• Báo cáo BOD/BOM (tự thực hiện)\n• Quyết định ưu tiên P0 (production critical)\n• Ký duyệt budget & headcount\n• Escalation cuối cùng (vượt tầm PM)',
            type: 'emerald'
          },
          {
            title: '🎯 PM DỰ ÁN — Điều phối công việc hàng ngày',
            content: '• Chủ trì Weekly Ops Review & Sprint Review\n• Điều phối timeline, risks, dependencies\n• Tổng hợp status, blockers → báo cáo Head\n• Điều phối bàn giao Deloitte (đến 31/3)',
            type: 'sage'
          }
        ]
      },
      {
        id: 2,
        title: 'User Support & Change Management',
        color: 'emerald',
        lead: 'Support Team (Huyền / My)',
        content: '• Tiếp nhận & phân loại yêu cầu (Line 1)\n• Tracking support SLA — theo dõi response/resolution time, báo cáo SLA hàng tuần\n• FAQ, hướng dẫn sử dụng, tài liệu cập nhật\n• Đào tạo refresh + tính năng mới cho BU\n• CRM Champion awards & user engagement\n• Truyền thông nội bộ, release notes'
      },
      {
        id: 3,
        title: 'Bug Fix & Issue Resolution',
        color: 'olive',
        lead: 'SA&QA Manager (Linh Chi)',
        content: '• Digital card issues: ưu tiên cao (Line 2A phân tích)\n• Root cause analysis → bug spec → Dev fix\n• QA regression test sau khi fix\n• Escalate Deloitte nếu vượt scope\n• Quản lý issue backlog & SLA'
      },
      {
        id: 4,
        title: 'System Ops & Monitoring',
        color: 'emerald',
        lead: 'Dev Manager (Tùng Giang) + Ops (Tú Kiệt)',
        content: '• Monitoring FSC, SFMC, Mulesoft CP4I hàng ngày\n• Health check integrations (SmartVista, ACL, CardX...)\n• Incident response & triage\n• Release management & deploy schedule\n• Thiết lập SOP phân biệt Routine Ops vs. ITSM'
      },
      {
        id: 5,
        title: 'Change Request — CR003 & New Features',
        color: 'olive',
        lead: 'SA&QA (Linh Chi) + PO (Dung — đến 30/6)',
        subLead: 'BA: Đào Thị Thúy Nga (đến 30/6) · QC: Ngô Long Huy (đến 30/6)',
        content: '• Nga (BA) phân tích requirement CR003 với Deloitte\n• PO Dung quản lý backlog, ưu tiên user stories\n• Dev estimation & sprint planning (Giang\'s team)\n• Huy (QC) kiểm thử tính năng mới đến 30/6\n• Thống nhất release calendar với BU'
      },
      {
        id: 6,
        title: 'Data Migration — New Core',
        color: 'stone',
        lead: 'Data Manager (Nguyễn Tất Thắng)',
        content: '• Data mapping: corebank mới → CRM data model\n• Data quality validation & reconciliation\n• Phối hợp Deloitte SA về data architecture\n• Data Analyst: BI reporting & adoption dashboard\n• Data streaming & batch job monitoring'
      }
    ]
  },
  orgChart: {
    title: 'Cơ cấu quản lý Block BTS CRM — Post Go-Live',
    head: {
      name: 'Nguyễn Ngọc Hiển',
      role: 'Head of CRM · 4.2820 · Kiêm nhiệm',
      subRole: 'Đồng thời phụ trách Công nghệ Thẻ',
      responsibilities: [
        'Phê duyệt chiến lược CRM & roadmap',
        'Báo cáo BOD/BOM (tự thực hiện)',
        'Quyết định ưu tiên P0 & ký duyệt budget',
        'Escalation cuối — vượt tầm PM mới lên'
      ]
    },
    pm: {
      name: 'Project Manager',
      role: 'Điều phối công việc hàng ngày',
      responsibilities: [
        'Điều phối công việc & meetings hàng ngày',
        'Theo dõi timeline, risks, dependencies',
        'Tổng hợp status, blockers → báo Head',
        'Điều phối bàn giao Deloitte (đến 31/3)'
      ]
    },
    teams: [
      { name: 'SA & QA Team', sub: '(incl. PO merged)', head: 'Trần Linh Chi', count: '~13 members', color: 'olive' },
      { name: 'Dev & Ops', sub: '(CRM focused)', head: 'Đoàn Tùng Giang', count: '6 devs + 1 ops', color: 'emerald' },
      { name: 'Data & BI', sub: '', head: 'Nguyễn Tất Thắng', count: '3 members', color: 'stone' },
      { name: 'Support Team', sub: '(User & Change)', head: 'Phan Thị Thương Huyền', count: '2 + 3 vacancies', color: 'emerald' },
      { name: 'SmartSales Team', sub: '(Dual lead)', head: 'Ngô Tấn Bình (Dev) / Phùng Vũ Dung (BV)', count: 'SS app chính + hỗ trợ CRM đến 30/6', color: 'stone' }
    ],
    vacancies: [
      '📍 Solution Architect (6.2822) — Vacancy cần tuyển · Báo cáo Head CRM'
    ]
  },
  teams: [
    {
      id: 'leadership',
      title: '🎯 Block Head & PM',
      color: 'emerald',
      members: [
        { name: 'Nguyễn Ngọc Hiển', role: 'Head of CRM · 4.2820 · Kiêm nhiệm', note: 'Kiêm nhiệm + CN Thẻ · Chi phối dự án: chiến lược, ưu tiên, BOD/BOM, tuyển dụng', initials: 'HN', specialColor: 'bg-vib-blue' },
        { name: 'Project Manager', role: 'Điều phối tổng thể dự án', note: 'Timeline · Resource · Dependencies · Risks', initials: 'PM', specialColor: 'bg-olive-600' }
      ]
    },
    {
      id: 'saqa',
      title: '🔍 SA & QA Team + PO (Merged) — Lead: Trần Linh Chi',
      color: 'olive',
      gridCols: 2,
      members: [
        { name: 'Trần Linh Chi', role: 'SA&QA Manager 4.2830 · Team Lead', initials: 'LC', specialColor: 'bg-olive-600' },
        { name: 'Lê Quỳnh Anh', role: 'CV cao cấp PT&KT · Lending focus', initials: 'QA' },
        { name: 'Nguyễn Thị Minh Ánh', role: 'Chuyên gia PT&KT · Card Physical CRM', initials: 'MA' },
        { name: 'Phạm Văn Hà', role: 'Chuyên gia PT&KT · Card Digital issues', initials: 'PH' },
        { name: 'Trần Thị Ngọc', role: 'Chuyên gia PT&KT · C360 / Card Digital', initials: 'TN' },
        { name: 'Nguyễn Trung Nhân', role: 'CV chính PT&KT', initials: 'NN' },
        { name: 'Nguyễn Hùng Uy', role: 'CV cao cấp PT&KT · SmartSales scope', initials: 'NH' },
        { name: 'Ngô Long Huy', role: 'Chuyên gia PT&KT · Banca scope', initials: 'LH' },
        { name: 'Đào Thị Thúy Nga', role: 'CV cao cấp PT&KT · SmartSales scope', initials: 'ND' },
        { name: 'Mai Thị Ngọc', role: 'CV cao cấp PT&KT', initials: 'MN' },
        { name: 'Trần Thị Bích Phượng', role: 'CV chính PT&KT', initials: 'BP' },
        { name: 'Ngô Thị Thanh Nhàn', role: 'CV cao cấp PT&KT', initials: 'TN' },
        { name: 'Trần Huyền Trang', role: 'GĐ nghiệp vụ QLS · Mkt Cloud lead', note: '↳ Merged từ PO team · SFMC vận hành chính', initials: 'HT', highlight: true },
        { name: 'Nguyễn Thùy Dung', role: 'CV cao cấp QLS · Mkt Cloud + Deposit', note: '↳ Merged từ PO team · SFMC vận hành', initials: 'TD', highlight: true }
      ]
    },
    {
      id: 'devops',
      title: '⚙️ Dev & Ops — CRM (Lead: Đoàn Tùng Giang)',
      color: 'emerald',
      members: [
        { name: 'Đoàn Tùng Giang', role: 'Dev Manager 4.2821 · CRM Release mgr', initials: 'TG', specialColor: 'bg-emerald-600' },
        { name: 'Vũ Văn Công', role: 'Chuyên gia Phát triển GP · FSC lead dev', initials: 'VC' },
        { name: 'Nguyễn Minh Báu', role: 'Chuyên gia Phát triển GP · Integration', initials: 'MB' },
        { name: 'Phạm Văn Sinh', role: 'Chuyên gia Phát triển GP', initials: 'PS' },
        { name: 'Huỳnh Thanh Bình', role: 'CV chính Phát triển GP · Bug fix', initials: 'TB' },
        { name: 'Lý Tú Kiệt', role: 'CV cao cấp Vận hành GP 5.1866 · Ops', initials: 'TK' },
        { name: 'Developer (Vacancy)', role: 'New hire — tăng capacity', initials: '+1', vacancy: true }
      ]
    },
    {
      id: 'data',
      title: '📊 Data & BI (Lead: Nguyễn Tất Thắng)',
      color: 'stone',
      members: [
        { name: 'Nguyễn Tất Thắng', role: 'Data & BI Manager 4.2817 · Migration lead', initials: 'TT', specialColor: 'bg-stone-600' },
        { name: 'Nguyễn Nhất Linh', role: 'CV cao cấp Phân tích Dữ liệu', initials: 'NL' },
        { name: 'Lê Quang Chấn Phong', role: 'CV Phân tích Dữ liệu · Adoption reports', initials: 'LP' }
      ]
    },
    {
      id: 'support',
      title: '🆘 Support Team (Lead: Phan Thị Thương Huyền)',
      color: 'emerald',
      members: [
        { name: 'Phan Thị Thương Huyền', role: 'Chuyên gia QLS · Support Lead · L1 head', note: 'Change mgmt · User engagement · Dispatch', initials: 'H', specialColor: 'bg-vib-blue' },
        { name: 'Lê Thị Diễm My', role: 'CV cao cấp QLS · L1 co-lead', initials: 'M' },
        { name: '3 Support Professionals (Vacancy)', role: 'New hire — hỗ trợ nghiệp vụ', initials: '+3', vacancy: true }
      ]
    }
  ],
  smartsales: {
    title: '🔀 SmartSales Team — Dual Lead · Hỗ trợ CRM đến 30/6, sau đó back về SmartSales only',
    assignmentTitle: '🗓️ Phân bổ CRM đến 30/6/2026',
    dev: {
      lead: 'Ngô Tấn Bình',
      role: 'Dev Manager 4.3075 · SmartSales dev lead',
      initials: 'NB',
      members: 'Lê Hoàng Anh · Nguyễn Duy Hóa · Lê Văn Hợi · Nguyễn Hữu Hùng · Nguyễn Hồng Yến Nhi · Nguyễn Tấn Phát · Đặng Hoàng Tuấn',
      note: 'Dev team tập trung SmartSales app. Hỗ trợ CRM chỉ khi có chỉ định.'
    },
    business: {
      lead: 'Phùng Vũ Dung',
      role: 'GĐ QLSP 4.3074 · PO + Nghiệp vụ lead',
      initials: 'PD',
      members: [
        { name: 'Trần Huyền Trang', role: 'PO · SmartSales + hỗ trợ CRM Mkt Cloud', initials: 'HT' },
        { name: 'Đào Thị Thúy Nga', role: 'BA/SA · SmartSales + hỗ trợ CRM SA', initials: 'TN' },
        { name: 'Ngô Long Huy', role: 'QC · SmartSales + hỗ trợ CRM QA', initials: 'LH' },
        { name: 'Nguyễn Trọng Trung', role: 'UI/UX · SmartSales design', initials: 'UI' }
      ]
    },
    crmAssignments: [
      { name: 'Phùng Vũ Dung', detail: 'PO backlog CRM · Ưu tiên sprint · Phê duyệt user story CRM', color: 'olive' },
      { name: 'Trần Huyền Trang', detail: 'Vận hành SFMC Marketing Cloud · Campaign ops · SFMC support BU', color: 'emerald' },
      { name: 'Đào Thị Thúy Nga', detail: 'BA phân tích CR003 · Hỗ trợ SA&QA Linh Chi khi cần · Banca scope', color: 'emerald' },
      { name: 'Ngô Long Huy', detail: 'QC regression test sau bug fix · Hỗ trợ SA&QA team kiểm thử', color: 'emerald' }
    ]
  },

  processes: [
    {
      title: '1. Luồng xử lý User Issue / Bug',
      steps: [
        { num: 'B1', title: 'BU báo cáo', who: 'BU → Support channel (Teams/email)' },
        { num: 'B2', title: 'L1 tiếp nhận & triage', who: 'Huyền/My phân loại → Priority P0/P1/P2' },
        { num: 'B3a', title: 'L1 xử lý', who: 'FAQ / hướng dẫn → Close ticket' },
        { num: 'B3b', title: 'Escalate L2A', who: 'SA phân tích root cause Dev fix → QA test' },
        { num: 'B3c', title: 'Escalate L3', who: 'Deloitte (đến 31/3) Issues ngoài scope' },
        { num: 'B4', title: 'Đóng & notify BU', who: 'L1 confirm user Cập nhật FAQ/KB' }
      ]
    },
    {
      title: '2. Luồng xử lý Yêu cầu Thay đổi / New Feature',
      steps: [
        { num: 'B1', title: 'BU đề xuất', who: 'Business Owner → Support Team' },
        { num: 'B2', title: 'PO intake & backlog', who: 'PO viết user story SA estimate impact' },
        { num: 'B3', title: 'Phê duyệt ưu tiên', who: 'PM review trước → Head CRM ký nếu cần' },
        { num: 'B4', title: 'Dev & Test', who: 'Dev build SA&QA kiểm thử' },
        { num: 'B5', title: 'UAT & Release', who: 'BU sign-off UAT → Deploy production' },
        { num: 'B6', title: 'Training & Comms', who: 'Support: đào tạo release note → BU' }
      ]
    }
  ],
  raci: {
    roles: [
      { group: 'LEADERSHIP', items: [ { name: 'Head CRM (Hiển)', key: 'head' }, { name: 'PM Dự án', key: 'pm' } ] },
      { group: 'SUPPORT', items: [ { name: 'Support Mgr (Huyền)', key: 'sup_mgr' }, { name: 'Support Prof (My+)', key: 'sup_prof' } ] },
      { group: 'SA & QA + PO', items: [ { name: 'SA&QA Mgr (Linh Chi)', key: 'sa_mgr' }, { name: 'SA&QA Prof (10 người)', key: 'sa_prof' }, { name: 'PO merged (Trang/Dung)', key: 'po' } ] },
      { group: 'DEV & OPS', items: [ { name: 'Dev Mgr (Tùng Giang)', key: 'dev_mgr' }, { name: 'Developer (5 người)', key: 'dev_prof' }, { name: 'Ops (Tú Kiệt)', key: 'ops' } ] },
      { group: 'DATA & BI', items: [ { name: 'Data Mgr (Thắng)', key: 'data_mgr' }, { name: 'Data Analyst (2)', key: 'data_prof' } ] },
      { group: 'DELOITTE', items: [ { name: 'Deloitte (→31/3)', key: 'vendor' } ] }
    ],
    sections: [
      {
        title: 'A. GOVERNANCE & CHIẾN LƯỢC',
        activities: [
          { task: 'Chiến lược CRM dài hạn & technology roadmap', head: 'A', pm: 'R', sa_mgr: 'C', po: 'C', dev_mgr: 'C', vendor: 'C' },
          { task: 'Báo cáo BOD/BOM: adoption KPIs, ROI, budget', head: 'A', pm: 'S', sup_mgr: 'C', sa_mgr: 'C', dev_mgr: 'C', data_mgr: 'R', data_prof: 'R' },
          { task: 'Phê duyệt ưu tiên backlog & release calendar', head: 'A', pm: 'R', sa_mgr: 'C', po: 'R', dev_mgr: 'C', vendor: 'I' },
          { task: 'Điều phối timeline, risks, cross-team dependencies (hàng ngày)', head: 'I', pm: 'R', sup_mgr: 'I', sa_mgr: 'I', dev_mgr: 'I', data_mgr: 'I', vendor: 'I' },
          { task: 'Tương tác BU Business Owners hàng ngày (Support + PO)', head: 'A', pm: 'C', sup_mgr: 'R', po: 'R' }
        ]
      },
      {
        title: 'B. USER SUPPORT & CHANGE MANAGEMENT',
        activities: [
          { task: 'Tiếp nhận yêu cầu BU (Single Point of Contact)', sup_mgr: 'A', sup_prof: 'R' },
          { task: 'Phân loại & dispatch issue theo nghiệp vụ (matrix)', sup_mgr: 'A', sup_prof: 'R', sa_mgr: 'I', sa_prof: 'I', po: 'I', dev_mgr: 'I', data_mgr: 'I' },
          { task: 'Hướng dẫn sử dụng, FAQ, knowledge base', sup_mgr: 'A', sup_prof: 'R', sa_mgr: 'C', sa_prof: 'C', po: 'C' },
          { task: 'Đào tạo refresh & đào tạo tính năng mới', head: 'I', sup_mgr: 'A', sup_prof: 'R', sa_mgr: 'S', sa_prof: 'S', po: 'C', vendor: 'S' },
          { task: 'Theo dõi SLA support (response/resolution time)', head: 'I', pm: 'I', sup_mgr: 'A', sup_prof: 'R' },
          { task: 'Tổng hợp issues log & quản lý bug backlog', head: 'I', pm: 'I', sup_mgr: 'I', sa_mgr: 'A', sa_prof: 'R', dev_mgr: 'C' },
          { task: 'Theo dõi adoption metrics (login, lead/app, feature usage)', head: 'I', pm: 'I', sup_mgr: 'R', data_mgr: 'A', data_prof: 'R' },
          { task: 'CRM Champion awards & user engagement events', head: 'I', pm: 'I', sup_mgr: 'A', sup_prof: 'R' },
          { task: 'Truyền thông nội bộ, release notes cho BU', head: 'A', pm: 'I', sup_mgr: 'R', sup_prof: 'R', sa_mgr: 'C', po: 'C', dev_mgr: 'I' }
        ]
      }
    ],
    notes: [
      'Change cần phê duyệt — PO thu thập backlog → Head CRM phê duyệt ưu tiên.',
      'Head CRM là người chi phối dự án; PM điều phối công việc hàng ngày; PO là đầu mối tương tác BU về product.',
      'Mọi issue kỹ thuật/nghiệp vụ cần được dispatch qua Support Team (Huyền/My) trước khi escalate SA/Dev.'
    ]
  },
  governance: {
    meetings: [
      { name: '🔴 Daily Issue Standup', freq: 'Hàng ngày 15\'', lead: 'Linh Chi (SA&QA)', participants: 'SA lead, Dev Giang, Ops Tú Kiệt', output: 'Issue status, blockers cleared' },
      { name: '🟡 Weekly Ops Review', freq: 'Hàng tuần', lead: 'Head CRM (PM hỗ trợ điều phối)', participants: 'All team leads + Deloitte PM', output: 'SLA review, release plan, adoption metrics, risks' },
      { name: '🟢 Bi-weekly Sprint Review', freq: '2 tuần/lần', lead: 'PO (Trang) + Dev Manager (Giang)', participants: 'PO, SA, Dev, BU Business Owner đại diện', output: 'Sprint demo, backlog grooming, next sprint plan' }
    ],
    issues: [
      { issue: 'Upload file campaign có cần raise change không?', solution: '3 loại: (1) Routine ops (upload theo SOP đã duyệt) → không cần. (2) Config change → ITSM ticket, Ops xử lý. (3) New feature → PO backlog. Cần viết SOP phân loại + publish BU.', owner: 'Head CRM + Dev Mgr quyết định rule. PM điều phối viết SOP.', deadline: '25/3/2026', priority: 'Critical' }
    ],
    actionPlan: [
      { id: 1, item: 'Lên lịch & xác nhận danh sách tham dự session bàn giao Deloitte (theo ma trận module)', owner: 'Head CRM + PM (điều phối lịch)', deadline: '20/3', status: 'Chưa làm' }
    ]
  }
};

const hrProject: ProjectData = {
  id: 'hr-transformation',
  name: 'HR Transformation',
  description: 'Dự án số hóa quy trình nhân sự và trải nghiệm nhân viên',
  icon: Users,
  color: 'emerald',
  metadata: {
    title: "HR Operating Model",
    subtitle: "Digital Transformation 2025",
    description: "Khung vận hành số hóa nhân sự — Tự động hóa quy trình & Trải nghiệm nhân viên",
    version: "v1.0",
    effectiveDate: "Tháng 1/2025",
    headcount: "15 FTEs",
    milestones: "Go-live Portal: 01/09/2025"
  },
  operatingModel: {
    tiers: [
      {
        id: 't1',
        label: 'TIER 1',
        subLabel: 'HR Helpdesk',
        color: 'bg-emerald-600',
        title: 'HR Operations — Hỗ trợ thủ tục hàng ngày',
        content: 'Tiếp nhận các yêu cầu về hợp đồng, bảo hiểm, nghỉ phép qua Portal.',
        badges: []
      }
    ],
    workstreams: [
      {
        id: 1,
        title: 'Recruitment Tech',
        color: 'blue',
        subItems: [
          { title: 'ATS System', content: 'Hệ thống quản lý tuyển dụng tự động.', type: 'blue' }
        ]
      }
    ]
  },
  orgChart: {
    title: 'Cơ cấu quản lý Dự án HR Transformation',
    head: { name: 'Lê Thị Nhân Sự', role: 'CHRO', responsibilities: ['Chiến lược con người'] },
    pm: { name: 'Trần Quản Lý', role: 'PMO', responsibilities: ['Theo dõi tiến độ'] },
    teams: []
  },
  teams: [],
  processes: [],
  raci: { roles: [], sections: [] },
  governance: { meetings: [], issues: [], actionPlan: [] }
};

export const projects: ProjectData[] = [crmProject, hrProject];
