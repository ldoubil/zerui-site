// 站点共用数据：全站文案与结构集中在此，页面只负责排版

export const SITE = {
  origin: 'https://zeruioutdoor.com',
  nameZh: '泽锐 zerui',
  nameEn: 'ZERUI',
  taglineZh: '为庭院与露台，造一套可以用很多年的户外厨房。',
  taglineEn: 'Outdoor kitchens built to last, for gardens and terraces.',
  waNumber: '8617853993611',
  phoneDisplay: '+86 178 5399 3611',
  phoneHref: '+8617853993611',
  email: 'zeruioutdoor@gmail.com',
};

export const navItems = [
  { href: '/products/', zh: '收藏', en: 'Collection' },
  { href: '/custom/', zh: 'OEM 与定制', en: 'OEM & Custom' },
  { href: '/projects/', zh: '经销商', en: 'Dealers' },
  { href: '/factory/', zh: '工厂', en: 'Factory' },
  { href: '/guides/', zh: '指南', en: 'Guide' },
  { href: '/about/', zh: '关于', en: 'About' },
  { href: '/contact/', zh: '联系', en: 'Contact' },
];

export interface Bi {
  zh: string;
  en: string;
}

export const categories = [
  {
    slug: 'islands',
    no: '01',
    image: 'islands',
    titleZh: '一体化户外厨房岛台',
    titleEn: 'Integrated Outdoor Kitchen Islands',
    shortZh: '整机交付，台面、柜体与设备做成一个整体。',
    shortEn: 'Delivered as a complete unit, with countertop, cabinets and equipment built together.',
    introZh:
      '把台面、柜体、烹饪设备与收纳做进同一个结构里。出厂前完成装配与检查，到场后按图纸就位，适合希望一次成型、减少现场施工的庭院项目。',
    introEn:
      'Countertop, cabinets, cooking equipment and storage are built into one structure. Units are assembled and checked before shipment, then set in place on site — a good fit for gardens that should come together in one go.',
    altZh: '不锈钢一体化户外厨房岛台，带柜体与操作台',
    altEn: 'Stainless steel integrated outdoor kitchen island with cabinetry and worktop',
    useCases: [
      { zh: '别墅庭院的主操作区', en: 'Main cooking area in a villa garden' },
      { zh: '泳池边的备餐与吧台', en: 'Poolside prep and bar counter' },
      { zh: '露台、屋顶的紧凑布局', en: 'Compact terraces and rooftop layouts' },
      { zh: '民宿、会所的公共厨房', en: 'Shared kitchens for guest houses and clubs' },
    ],
    forms: [
      { zh: '直排', en: 'Straight run' },
      { zh: 'L 型', en: 'L-shape' },
      { zh: '独立岛台', en: 'Freestanding island' },
      { zh: '带顶棚单元', en: 'Covered unit' },
    ],
    options: [
      { zh: '台面：岩板、石英石或不锈钢', en: 'Countertop: sintered stone, quartz or stainless steel' },
      { zh: '柜门：平门、抽拉门或多层抽屉', en: 'Doors: flat, pull-out or drawer stacks' },
      { zh: '表面：拉丝本色或按色板定制', en: 'Finish: brushed steel or custom colour' },
      { zh: '设备：烧烤炉、水槽、烟机、冰箱', en: 'Equipment: grill, sink, hood, fridge' },
    ],
    equipZh: '烧烤炉、水槽与龙头、烟机、嵌入式冰箱、垃圾桶与调料拉篮。设备品牌与型号可按项目指定或由其自行提供。',
    equipEn:
      'Grills, sink and faucet, range hood, built-in fridge, bins and spice pull-outs. Brands and models can be specified by the project or supplied by the client.',
    noteZh: '尺寸、开孔与设备位置按场地实测与确认图纸执行。',
    noteEn: 'Dimensions, cut-outs and equipment positions follow site measurements and approved drawings.',
  },
  {
    slug: 'modular',
    no: '02',
    image: 'modular',
    titleZh: '模块化户外厨房系统',
    titleEn: 'Modular Outdoor Kitchen Systems',
    shortZh: '拆分运输，现场拼装，后续可以继续加。',
    shortEn: 'Ships in modules, assembles on site, and can be extended later.',
    introZh:
      '以柜体、台面与设备为独立模块，按现场尺寸自由组合。拆开运输更适合上楼、窄通道与集装箱装载，也方便分期建设或后期增加单元。',
    introEn:
      'Cabinets, countertops and equipment are treated as independent modules and combined to fit the site. Flat shipping suits stairways, narrow access and container loading, and makes phased builds or later additions straightforward.',
    altZh: '模块化户外厨房，开放式框架与分段柜体',
    altEn: 'Modular outdoor kitchen with an open frame and sectional cabinets',
    useCases: [
      { zh: '经销商备货与展厅样机', en: 'Dealer stock and showroom displays' },
      { zh: '工程项目的批量配套', en: 'Batch supply for development projects' },
      { zh: '屋顶、狭窄通道的搬运', en: 'Rooftops and sites with narrow access' },
      { zh: '分期建设、逐步扩展', en: 'Phased builds and gradual expansion' },
    ],
    forms: [
      { zh: '单柜起步', en: 'Start with a single cabinet' },
      { zh: '直排组合', en: 'Straight-run combination' },
      { zh: 'L 型组合', en: 'L-shaped combination' },
      { zh: '岛台组合', en: 'Island combination' },
    ],
    options: [
      { zh: '模块宽度与进深按现场排布', en: 'Module widths and depths laid out to the site' },
      { zh: '台面可分段或整块交付', en: 'Countertops in sections or single pieces' },
      { zh: '门板、把手与颜色可选', en: 'Doors, handles and colours selectable' },
      { zh: '预留水、电、燃气管线位置', en: 'Reserved routes for water, power and gas' },
    ],
    equipZh: '可在任意模块中嵌入烧烤炉、水槽、抽屉与收纳配件，也可先留空位，后续再补设备。',
    equipEn:
      'Grills, sinks, drawers and storage can be built into any module, or bays can be left open for equipment added later.',
    noteZh: '模块组合、连接方式与装箱方案按现场尺寸和运输方式确认。',
    noteEn: 'Module combinations, connections and packing plans are confirmed against site dimensions and shipping method.',
  },
  {
    slug: 'grills',
    no: '03',
    image: 'grills',
    titleZh: '专业烧烤炉',
    titleEn: 'Professional Grills',
    shortZh: '嵌入岛台或独立使用，按烹饪方式选型。',
    shortEn: 'Built into an island or used freestanding, selected around how you cook.',
    introZh:
      '面向庭院与商用场景的烧烤炉结构，可嵌入岛台与柜体，也可独立使用。炉体、烤网与上盖按烹饪习惯与使用频率组合。',
    introEn:
      'Grill structures for gardens and commercial settings, built into islands and cabinets or used freestanding. Body, grates and lid are combined around cooking habits and frequency of use.',
    altZh: '嵌入式不锈钢烧烤炉与户外操作台',
    altEn: 'Built-in stainless steel grill with an outdoor worktop',
    useCases: [
      { zh: '家庭庭院的日常烧烤', en: 'Everyday grilling in a home garden' },
      { zh: '泳池派对与露台聚会', en: 'Pool parties and terrace gatherings' },
      { zh: '民宿、餐厅的出品区', en: 'Guest houses and restaurant service areas' },
      { zh: '经销商选品与配套', en: 'Dealer selection and pairing' },
    ],
    forms: [
      { zh: '嵌入式', en: 'Built-in' },
      { zh: '独立式', en: 'Freestanding' },
      { zh: '双侧操作', en: 'Dual-side operation' },
      { zh: '带侧炉或储物', en: 'With side burner or storage' },
    ],
    options: [
      { zh: '炉体尺寸与分区', en: 'Body size and cooking zones' },
      { zh: '加热方式按市场选择', en: 'Heat source selected for the market' },
      { zh: '烤网材质与密度', en: 'Grate material and density' },
      { zh: '上盖、侧炉与把手', en: 'Lid, side burner and handles' },
    ],
    equipZh: '可作为岛台或柜体的嵌入式单元，也可单独配置推车或支架使用。',
    equipEn:
      'Can be built into an island or cabinet, or supplied with a cart or stand for freestanding use.',
    noteZh: '气源、电压与开孔尺寸按目标市场与确认图纸执行。',
    noteEn: 'Gas source, voltage and cut-out dimensions follow the target market and approved drawings.',
  },
  {
    slug: 'cabinets',
    no: '04',
    image: 'cabinets',
    titleZh: '不锈钢柜体与配件',
    titleEn: 'Stainless Steel Cabinets & Accessories',
    shortZh: '补柜、替换门板，或为项目批量配套。',
    shortEn: 'Add cabinets, replace doors, or supply a full project.',
    introZh:
      '门板、抽屉、水槽柜与转角柜等独立柜体，用于补充配置、替换门板或为项目批量配套。可与既有台面和设备对接。',
    introEn:
      'Independent units — doors, drawers, sink cabinets and corner cabinets — for adding storage, replacing doors or supplying a project in bulk. They can be matched to existing countertops and equipment.',
    altZh: '不锈钢户外厨房柜体与收纳空间',
    altEn: 'Stainless steel outdoor kitchen cabinets and storage',
    useCases: [
      { zh: '补柜与扩建', en: 'Adding cabinets and extending a layout' },
      { zh: '门板与把手替换', en: 'Replacing doors and handles' },
      { zh: '水槽与收纳单元', en: 'Sink and storage units' },
      { zh: '工程项目批量配套', en: 'Bulk supply for projects' },
    ],
    forms: [
      { zh: '单门柜', en: 'Single-door cabinet' },
      { zh: '抽屉柜', en: 'Drawer cabinet' },
      { zh: '水槽柜', en: 'Sink cabinet' },
      { zh: '转角柜', en: 'Corner cabinet' },
    ],
    options: [
      { zh: '门板形式与开启方向', en: 'Door style and opening direction' },
      { zh: '把手、拉手与隐藏式开合', en: 'Handles, pulls or push-to-open' },
      { zh: '内部隔板与拉篮', en: 'Internal shelves and pull-out baskets' },
      { zh: '颜色与表面处理', en: 'Colour and surface finish' },
    ],
    equipZh: '可内置水槽、垃圾桶、调料拉篮与隔板，也可预留设备开孔。',
    equipEn:
      'Sinks, bins, spice pull-outs and shelves can be built in, or openings reserved for equipment.',
    noteZh: '开孔、五金与色板按项目确认；与既有台面衔接需提供现场尺寸。',
    noteEn:
      'Cut-outs, hardware and colour are confirmed per project; matching existing countertops requires site dimensions.',
  },
];

export const factorySteps = [
  {
    no: '01',
    titleZh: '结构设计',
    titleEn: 'Design',
    descZh: '按场地尺寸、设备清单与使用习惯确认结构方案，输出可执行的图纸。',
    descEn: 'Structure agreed around site dimensions, equipment list and use, then issued as buildable drawings.',
  },
  {
    no: '02',
    titleZh: '钣金加工',
    titleEn: 'Sheet Metal',
    descZh: '不锈钢板材下料、折弯与成型，控制尺寸与拼接缝隙。',
    descEn: 'Stainless steel is cut, bent and formed, with dimensions and seams kept under control.',
  },
  {
    no: '03',
    titleZh: '焊接与打磨',
    titleEn: 'Welding & Finishing',
    descZh: '框架与柜体焊接，外露焊缝打磨，保证结构与观感。',
    descEn: 'Frames and cabinets are welded, with exposed seams ground for structure and appearance.',
  },
  {
    no: '04',
    titleZh: '表面处理',
    titleEn: 'Surface Treatment',
    descZh: '按订单做拉丝、喷涂或其他表面处理，颜色按色板核对。',
    descEn: 'Brushed, coated or other finishes per order, with colour checked against the approved sample.',
  },
  {
    no: '05',
    titleZh: '整机装配',
    titleEn: 'Assembly',
    descZh: '柜体、台面与设备组装为完整单元，核对开孔与配合。',
    descEn: 'Cabinets, countertops and equipment assembled into complete units, with cut-outs and fits checked.',
  },
  {
    no: '06',
    titleZh: '质检与包装',
    titleEn: 'QC & Packing',
    descZh: '出货前检查外观、结构与配件，按运输方式做出口包装。',
    descEn: 'Appearance, structure and parts checked before shipment, then packed for the chosen transport method.',
  },
];

export const materialRows = [
  {
    part: { zh: '主体框架', en: 'Main frame' },
    material: { zh: '不锈钢', en: 'Stainless steel' },
    spec: { zh: '按结构图纸下料、折弯与焊接', en: 'Cut, bent and welded to the structural drawings' },
  },
  {
    part: { zh: '台面', en: 'Countertop' },
    material: { zh: '岩板 / 石英石 / 不锈钢', en: 'Sintered stone / quartz / stainless steel' },
    spec: { zh: '按项目选配，边缘与开孔按图纸加工', en: 'Selected per project; edges and cut-outs machined to drawings' },
  },
  {
    part: { zh: '柜门与抽屉', en: 'Doors & drawers' },
    material: { zh: '不锈钢', en: 'Stainless steel' },
    spec: { zh: '拉丝本色或按色板喷涂', en: 'Brushed steel or coated to the approved colour' },
  },
  {
    part: { zh: '五金', en: 'Hardware' },
    material: { zh: '不锈钢铰链与滑轨', en: 'Stainless hinges and runners' },
    spec: { zh: '按户外使用环境选型', en: 'Selected for outdoor use' },
  },
  {
    part: { zh: '焊缝', en: 'Welds' },
    material: { zh: '满焊 / 段焊', en: 'Full or stitch welds' },
    spec: { zh: '外露焊缝打磨处理', en: 'Exposed seams ground and finished' },
  },
  {
    part: { zh: '表面', en: 'Finish' },
    material: { zh: '拉丝 / 喷涂', en: 'Brushed / coated' },
    spec: { zh: '按使用环境与色板确认', en: 'Confirmed against environment and colour sample' },
  },
  {
    part: { zh: '包装', en: 'Packing' },
    material: { zh: '木箱 + 防潮材料', en: 'Timber crate + moisture protection' },
    spec: { zh: '按整机或模块方式装箱', en: 'Packed as complete units or modules' },
  },
];

export const qcSteps = [
  {
    no: '01',
    titleZh: '来料与板材复核',
    titleEn: 'Incoming material check',
    descZh: '核对板材、五金与配件的规格与数量，确认无明显变形与损伤。',
    descEn: 'Specifications and quantities of sheet, hardware and parts checked, with visible deformation or damage rejected.',
  },
  {
    no: '02',
    titleZh: '焊接与结构检查',
    titleEn: 'Weld & structure check',
    descZh: '检查焊缝、框架方正度与柜体尺寸，确认结构稳定。',
    descEn: 'Welds, frame squareness and cabinet dimensions checked for structural stability.',
  },
  {
    no: '03',
    titleZh: '装配与功能核对',
    titleEn: 'Assembly & function check',
    descZh: '核对门板缝隙、抽屉滑动、开孔位置与设备配合。',
    descEn: 'Door gaps, drawer movement, cut-out positions and equipment fit verified.',
  },
  {
    no: '04',
    titleZh: '出货前包装检查',
    titleEn: 'Pre-shipment packing check',
    descZh: '按装箱单清点配件，检查防护、固定与标签。',
    descEn: 'Parts counted against the packing list, with protection, fixing and labels checked.',
  },
];

export const packingPoints = [
  {
    zh: '整机交付时，外露台面与门板加保护层，边角单独加固。',
    en: 'For complete units, countertops and doors receive a protective layer, with corners reinforced separately.',
  },
  {
    zh: '模块交付时，按安装顺序分箱，箱内附对应模块编号。',
    en: 'For modular delivery, modules are crated in installation order and numbered inside each crate.',
  },
  {
    zh: '五金与配件独立装袋，随箱附装箱单，便于到场清点。',
    en: 'Hardware and small parts are bagged separately, with a packing list in the crate for site checking.',
  },
  {
    zh: '按海运或陆运方式选择木箱、缠膜与防潮处理。',
    en: 'Crating, wrapping and moisture protection are chosen for sea or road transport.',
  },
];

export const customScope = [
  {
    no: '01',
    titleZh: '尺寸与布局',
    titleEn: 'Dimensions & layout',
    descZh: '按场地实测调整宽度、进深与转角，直排、L 型、U 型或岛台从同一套结构展开。',
    descEn: 'Width, depth and corners set to site measurements; straight runs, L-shapes, U-shapes and islands built from one structure.',
  },
  {
    no: '02',
    titleZh: '台面、柜体与表面',
    titleEn: 'Worktop, cabinets & finish',
    descZh: '台面材质、厚度与收边，柜门形式与分缝，拉丝本色或按色板喷涂，都按图纸确认。',
    descEn: 'Worktop material, thickness and edge, door style and joint lines, brushed steel or coating to a colour sample — all confirmed on drawings.',
  },
  {
    no: '03',
    titleZh: '设备与水电',
    titleEn: 'Equipment & services',
    descZh: '按指定炉具、水槽、冰箱等设备预留开孔、层板与水电位置，按目的地标准规划接口。',
    descEn: 'Cut-outs, shelves and utility positions reserved for specified grills, sinks and fridges, with connections planned for the destination market.',
  },
  {
    no: '04',
    titleZh: '品牌与包装',
    titleEn: 'Branding & packing',
    descZh: '铭牌、标签、说明书与出口包装可跟随你的品牌；贴牌产品线与分箱方式按订单执行。',
    descEn: 'Nameplates, labels, manuals and export packing can carry your brand; private label ranges and crate splits follow the order.',
  },
];

export const customSteps = [
  {
    no: '01',
    titleZh: '需求',
    titleEn: 'Brief',
    descZh: '提供场地尺寸、使用场景、设备清单、目标市场与数量。',
    descEn: 'Share site dimensions, use case, equipment list, target market and quantity.',
  },
  {
    no: '02',
    titleZh: '设计',
    titleEn: 'Design',
    descZh: '按需求出结构方案与图纸，确认布局、开孔与材质。',
    descEn: 'Structure and drawings prepared around the brief, confirming layout, cut-outs and materials.',
  },
  {
    no: '03',
    titleZh: '确认',
    titleEn: 'Approve',
    descZh: '确认图纸、色板与关键细节，形成书面生产依据。',
    descEn: 'Drawings, colour samples and key details approved as the written basis for production.',
  },
  {
    no: '04',
    titleZh: '生产',
    titleEn: 'Produce',
    descZh: '按确认件排产、装配与检验；出口包装在厂内完成后出货。',
    descEn: 'Scheduled, assembled and checked against the approved documents, with export packing completed in-house before dispatch.',
  },
];

export const principles = [
  {
    no: '01',
    titleZh: '结构优先',
    titleEn: 'Structure first',
    descZh: '先解决承重、排水、通风与设备检修，再谈外观。结构不成立的样子，不做。',
    descEn: 'Load, drainage, ventilation and service access come before appearance. If the structure does not work, the look does not matter.',
  },
  {
    no: '02',
    titleZh: '暗处用料',
    titleEn: 'Materials where they are hidden',
    descZh: '柜体内部、背板与五金这些看不见的地方，同样按户外环境选材。',
    descEn: 'Cabinet interiors, back panels and hardware — the parts nobody photographs — are still specified for outdoor conditions.',
  },
  {
    no: '03',
    titleZh: '整机交付',
    titleEn: 'Delivered as a whole',
    descZh: '能整体完成的，不拆成散件；必须拆分的，按安装顺序编号装箱。',
    descEn: 'What can be completed as one unit is not broken into loose parts; what must be split is crated in installation order.',
  },
];

export const audiences = [
  {
    titleZh: '经销商与进口商',
    titleEn: 'Dealers & importers',
    descZh: '需要稳定供货、可贴牌、能配合装箱与展厅样机的供应方。',
    descEn: 'Supply partners who need stable output, private label, container planning and showroom samples.',
  },
  {
    titleZh: '设计机构与工程方',
    titleEn: 'Designers & contractors',
    descZh: '需要按图纸落地、尺寸可调、能与现场其他工序衔接的产品。',
    descEn: 'Teams that need products built to drawings, adjustable in size, and able to interface with other site trades.',
  },
  {
    titleZh: '庭院与住宅业主',
    titleEn: 'Homeowners',
    descZh: '希望一次做对、少返工，能长期在户外使用的厨房。',
    descEn: 'Owners who want it done right the first time and a kitchen that holds up outdoors for years.',
  },
];
