// 常见问题：按主题分组，答案给条件与做法，不做绝对承诺

export interface FaqItem {
  id: string;
  q: { zh: string; en: string };
  a: { zh: string; en: string };
}

export const faqGroups: { id: string; title: { zh: string; en: string }; items: FaqItem[] }[] = [
  {
    id: 'basics',
    title: { zh: '基础', en: 'Basics' },
    items: [
      {
        id: 'what-is-a-pod',
        q: { zh: '什么是户外厨房舱（pod）？', en: 'What is an outdoor kitchen pod?' },
        a: {
          zh: '一套在工厂预制完成的户外烹饪与操作单元：柜体、台面与设备整合在同一结构里，到场就位或现场拼装后即可使用。',
          en: 'A prefabricated outdoor cooking and preparation unit: cabinets, countertop and equipment integrated into one structure, ready to use once lifted into place or assembled on site.',
        },
      },
      {
        id: 'minimum-order',
        q: { zh: '最小订购数量是多少？', en: 'What is the minimum order quantity?' },
        a: {
          zh: '1 件起。单件项目与批量项目都会单独评估，经销商可以从展厅单元开始。',
          en: 'One unit. Single-unit and batch projects are assessed individually, and dealers can start with a showroom unit.',
        },
      },
      {
        id: 'lead-time',
        q: { zh: '标准生产交货周期是多少？', en: 'What is the standard production lead time?' },
        a: {
          zh: '标准配置约 20 天，从图纸与色板书面确认后开始计算。运输时间另计，旺季与改动较多的项目会提前说明。',
          en: 'Around 20 days for a standard configuration, counted from written approval of drawings and colour samples. Shipping is additional; peak periods and heavily revised projects are flagged in advance.',
        },
      },
      {
        id: 'customise',
        q: { zh: '我可以定制尺寸、颜色和设备吗？', en: 'Can I customise size, colour and equipment?' },
        a: {
          zh: '可以。尺寸、布局、台面、颜色、设备选择与开孔位置都可以按图纸调整，最终规格以书面确认为准。',
          en: 'Yes. Dimensions, layout, countertop, colour, equipment choice and cut-out positions can follow drawings, with final specifications confirmed in writing.',
        },
      },
      {
        id: 'appliances',
        q: { zh: '所有家电都包含在内吗？', en: 'Are all appliances included?' },
        a: {
          zh: '按配置。报价单会列明包含的设备、选配项以及需要现场预留的水电条件。',
          en: 'It depends on the configuration. The quotation lists included appliances, optional items and the utilities to be prepared on site.',
        },
      },
      {
        id: 'international-shipping',
        q: { zh: '可以进行国际运输吗？', en: 'Can you ship internationally?' },
        a: {
          zh: '可以。按目的地安排出口包装与运输；下单前确认装箱尺寸、重量、贸易条款与到场卸货条件。',
          en: 'Yes. Export packing and shipping are arranged for your destination; confirm packed dimensions, weight, trade terms and unloading conditions before ordering.',
        },
      },
      {
        id: 'certification',
        q: { zh: '有哪些认证可供选择？', en: 'What certifications are available?' },
        a: {
          zh: '不预置通用证书。电气元件与整机所需的合规资料，按项目配置与目的地要求提供或确认；下单前请告知目的地并索取适用文件。',
          en: 'No universal certificates are pre-issued. Compliance documents for electrical components and the finished unit are provided or confirmed against the project configuration and destination requirements; tell us the destination and request the applicable documents before ordering.',
        },
      },
      {
        id: 'site-preparation',
        q: { zh: '安装前我应该准备些什么？', en: 'What should I prepare before installation?' },
        a: {
          zh: '确认平整硬化的基础、卸货与搬运通道、当地报批要求，以及已接通的给排水、电气与燃气；接管由具备资质的本地人员完成。',
          en: 'Confirm a level, hard base, access for unloading and moving, local approval requirements, and approved water, drainage, electrical and gas connections; connections are made by qualified local trades.',
        },
      },
    ],
  },
  {
    id: 'quote',
    title: { zh: '报价与订单', en: 'Quotes & orders' },
    items: [
      {
        id: 'quote-info',
        q: { zh: '报价需要提供哪些信息？', en: 'What do you need for a quote?' },
        a: {
          zh: '场地尺寸或草图、想要的布局、设备清单、目标市场与大致数量。信息越具体，报价越接近最终价格；只有一张参考图时，也可以先给区间方案。',
          en: 'Site dimensions or a sketch, the intended layout, equipment list, target market and approximate quantity. The more specific the input, the closer the quote; with only a reference image, an indicative option can be prepared first.',
        },
      },
      {
        id: 'countertop',
        q: { zh: '台面可以选哪些材料？', en: 'Which countertop materials are available?' },
        a: {
          zh: '常见选择是岩板、石英石与不锈钢。岩板与石英石观感更接近室内厨房，不锈钢更耐候、便于清洁。最终选择要结合使用频率、日晒与维护习惯，报价时按项目确认。',
          en: 'Common choices are sintered stone, quartz and stainless steel. Stone reads closer to an indoor kitchen; stainless is more weather-tolerant and easier to clean. The final choice depends on use, sun exposure and maintenance habits, confirmed per project at quotation.',
        },
      },
      {
        id: 'samples',
        q: { zh: '可以先看颜色或材质样块吗？', en: 'Can I see colour or material samples first?' },
        a: {
          zh: '可以。喷涂颜色与台面材料可提供样块，样块确认后再进入批量生产。样块的寄送方式与时间按项目沟通。',
          en: 'Yes. Swatches are available for coatings and countertop materials, and production starts after the swatch is approved. Shipping method and timing for samples are agreed per project.',
        },
      },
      {
        id: 'which-form',
        q: { zh: '不同形态之间怎么选？', en: 'How do I choose between the different forms?' },
        a: {
          zh: '希望一次成型、现场施工少的项目，看一体化岛台；需要拆分运输、上楼或分期扩建的，看模块化系统；只需要烹饪核心的，看烧烤炉；补柜、替换门板或项目配套，看柜体与配件。也可以组合使用。',
          en: 'For projects that should come together in one go with little site work, look at integrated islands; for split shipping, stair access or phased builds, modular systems; for the cooking core alone, grills; for added cabinets, door replacement or project supply, cabinets. They can also be combined.',
        },
      },
      {
        id: 'drawing-changes',
        q: { zh: '图纸修改怎么处理？', en: 'What happens if drawings change?' },
        a: {
          zh: '确认前可以修改；确认后、投产前的改动需要重新出图并确认影响。已经下料或进入焊接的改动会产生额外成本，具体按改动范围评估。',
          en: 'Changes are possible before approval. After approval but before production, revisions are re-drawn and their impact confirmed. Changes after cutting or welding has started carry additional cost, assessed against the scope of the change.',
        },
      },
    ],
  },
  {
    id: 'delivery',
    title: { zh: '物流与交付', en: 'Shipping & delivery' },
    items: [
      {
        id: 'whole-or-module',
        q: { zh: '整机交付和模块交付怎么选？', en: 'Complete unit or modular delivery?' },
        a: {
          zh: '整机交付到场后吊装就位即可，适合通道宽敞、场地平整的项目；模块交付更适合上楼、窄门洞或分期安装。两种方式可以混用，按场地条件确认。',
          en: 'A complete unit only needs lifting into place, which suits clear access and level ground; modular delivery is better for stairways, narrow openings or phased installation. Both can be mixed, confirmed against site conditions.',
        },
      },
      {
        id: 'packing',
        q: { zh: '出口包装是怎么做的？', en: 'How is export packing done?' },
        a: {
          zh: '按海运或陆运选择木箱、缠膜与防潮处理；整机对外露台面和门板加保护层，模块按安装顺序分箱并编号，五金配件独立装袋并附装箱单。',
          en: 'Crating, wrapping and moisture protection are chosen for sea or road transport. Complete units get protection on countertops and doors; modules are crated in installation order and numbered, with hardware bagged separately and a packing list included.',
        },
      },
      {
        id: 'forwarder',
        q: { zh: '可以指定货代吗？', en: 'Can I use my own forwarder?' },
        a: {
          zh: '可以。可以提供工厂交货或按指定货代的要求交货，具体贸易条款与交接方式在报价时确认。',
          en: 'Yes. Ex-works delivery or handover to your nominated forwarder can be arranged, with trade terms and handover method confirmed at quotation.',
        },
      },
      {
        id: 'damage',
        q: { zh: '运输中出现损坏怎么办？', en: 'What if something is damaged in transit?' },
        a: {
          zh: '到场后请先按装箱单清点并拍照记录，再与我们一起核对。属于包装或生产问题的部分按订单约定处理；运输环节的责任按承运条款划分。',
          en: 'On arrival, count against the packing list and photograph any issue before checking with us. Items affected by packing or production are handled under the order terms; transport liability follows the carrier terms.',
        },
      },
    ],
  },
  {
    id: 'install',
    title: { zh: '安装与使用', en: 'Installation & use' },
    items: [
      {
        id: 'site-conditions',
        q: { zh: '现场需要具备什么条件？', en: 'What does the site need to provide?' },
        a: {
          zh: '平整硬化的地面或基础、设备所需的电源与水源、以及吊装或搬运通道。屋顶与高层项目需提前确认承重与吊装方式。',
          en: 'A level, hard base, power and water for the equipment, and access for lifting or carrying. Rooftop and upper-floor projects need load capacity and lifting method confirmed in advance.',
        },
      },
      {
        id: 'utilities',
        q: { zh: '水电燃气需要提前预留吗？', en: 'Should utilities be prepared in advance?' },
        a: {
          zh: '需要。确认设备清单后就应预留电源、给排水与燃气管线位置。具体点位以确认图纸为准，现场由具备资质的施工方完成接管。',
          en: 'Yes. Once the equipment list is fixed, power, water, drainage and gas routes should be reserved. Exact positions follow the approved drawings, with connections made on site by qualified trades.',
        },
      },
      {
        id: 'coastal',
        q: { zh: '海边或高湿环境要注意什么？', en: 'What matters in coastal or humid climates?' },
        a: {
          zh: '优先选用耐候的表面处理与不锈钢五金，减少积水和缝隙存水，并保持通风。沿海项目建议提高清洁频率，定期检查焊缝与五金。',
          en: 'Prefer weather-resistant finishes and stainless hardware, avoid standing water and water traps in joints, and keep the area ventilated. Coastal projects benefit from more frequent cleaning and periodic checks of welds and hardware.',
        },
      },
      {
        id: 'winter',
        q: { zh: '冬天不用时怎么收纳？', en: 'How should it be stored in winter?' },
        a: {
          zh: '关闭水源与燃气，排空管路，覆盖防尘罩并保持通风。可拆卸的设备与配件建议移入室内；重新启用前检查接口与点火。',
          en: 'Shut off water and gas, drain lines, cover with a breathable cover and keep ventilation. Removable equipment and parts are best stored indoors; check connections and ignition before the next season.',
        },
      },
    ],
  },
  {
    id: 'service',
    title: { zh: '售后与备件', en: 'After-sales & parts' },
    items: [
      {
        id: 'after-sales',
        q: { zh: '售后怎么联系？', en: 'How do I reach after-sales?' },
        a: {
          zh: '通过 WhatsApp、电话或邮箱联系我们，说明订单信息、问题位置与照片。我们会先判断属于安装、使用还是产品问题，再给出处理方式。',
          en: 'Contact us by WhatsApp, phone or email with the order details, the location of the issue and photos. We first establish whether it relates to installation, use or the product, then propose a remedy.',
        },
      },
      {
        id: 'spare-parts',
        q: { zh: '备件怎么补？', en: 'How are spare parts supplied?' },
        a: {
          zh: '铰链、滑轨、把手等常用件可按订单记录补发；门板与台面等大件需要按原图纸重做。补件通常随下一次出货或按约定的运输方式安排。',
          en: 'Common parts such as hinges, runners and handles can be reissued against the order record; larger items such as doors and countertops are remade to the original drawings. Parts usually ship with the next order or by an agreed method.',
        },
      },
      {
        id: 'scratches',
        q: { zh: '表面出现划痕怎么处理？', en: 'How should surface scratches be treated?' },
        a: {
          zh: '拉丝表面可沿原有纹理方向做局部处理，喷涂表面建议使用同色修补材料。大面积损伤需要更换部件，避免局部修补产生明显色差。',
          en: 'Brushed surfaces can be spot-treated along the existing grain; coated surfaces are best touched up with matching material. Large damage calls for part replacement to avoid visible colour differences.',
        },
      },
    ],
  },
];
