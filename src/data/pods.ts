export type PodSpec = {
  labelZh: string;
  labelEn: string;
  valueZh: string;
  valueEn: string;
};

export type Pod = {
  slug: string;
  fullEn: string;
  seriesZh: string;
  seriesEn: string;
  nameZh: string;
  nameEn: string;
  image: string;
  altZh: string;
  altEn: string;
  leadZh: string;
  leadEn: string;
  featuresZh: string[];
  featuresEn: string[];
  asideZh?: string;
  asideEn?: string;
  specs: PodSpec[];
  bodyZh: string[];
  bodyEn: string[];
  related: string[];
};

export const pods: Pod[] = [
  {
    slug: 'obsidian',
    fullEn: 'Obsidian integrated outdoor kitchen pod',
    seriesZh: '签名系列',
    seriesEn: 'Signature collection',
    nameZh: '黑曜石',
    nameEn: 'Obsidian',
    image: 'islands',
    altZh: '黑曜石一体化户外厨房舱，抬起式顶篷，深色柜体，集成烤炉、水槽与冷藏',
    altEn: 'Obsidian integrated outdoor kitchen pod with lift-up canopy, dark cabinets, built-in grill, sink and refrigeration',
    leadZh: '深色饰面的户外厨房，集成可升降顶篷、烧烤台、水槽、收纳与冷藏空间。适合现代庭院与经销商展厅。',
    leadEn:
      'A striking, dark-finished outdoor kitchen with an integrated lift-up canopy, grill station, sink, storage and refrigerator space. Designed for contemporary gardens and dealer showrooms.',
    featuresZh: ['深色建筑感饰面', '可升降顶篷，集成照明', '烧烤、水槽与收纳布局', '可选冷藏配置'],
    featuresEn: [
      'Dark architectural finish',
      'Lift-up canopy with integrated lighting',
      'Grill, sink and storage layout',
      'Refrigerator configuration available',
    ],
    specs: [
      {
        labelZh: '结构',
        labelEn: 'Structure',
        valueZh: '内外均为 304 不锈钢结构',
        valueEn: '304 stainless steel construction, inside and out',
      },
      {
        labelZh: '尺寸',
        labelEn: 'Dimensions',
        valueZh: '可定制与标准占地面积；可索取图纸',
        valueEn: 'Custom and standard footprints available; drawing on request',
      },
      {
        labelZh: '顶篷',
        labelEn: 'Canopy',
        valueZh: '可升降结构；操作系统在生产前书面确认',
        valueEn: 'Lift-up configuration; operating system confirmed in writing before production',
      },
      {
        labelZh: '设备',
        labelEn: 'Appliances',
        valueZh: '按目的地市场约定',
        valueEn: 'As agreed for destination market',
      },
      {
        labelZh: '电气与燃气',
        labelEn: 'Electrical & gas',
        valueZh: '按目的地设备与接口要求配置',
        valueEn: 'Destination-specific equipment and connection requirements',
      },
      {
        labelZh: '包装与运输',
        labelEn: 'Packing & shipping',
        valueZh: '包装尺寸、毛重与装柜方案在报价时确认',
        valueEn: 'Packed size, gross weight and container plan confirmed at quotation',
      },
      {
        labelZh: '最小起订',
        labelEn: 'Minimum order',
        valueZh: '1 台',
        valueEn: '1 unit',
      },
      {
        labelZh: '标准生产',
        labelEn: 'Standard production',
        valueZh: '20 天，以订单确认为准',
        valueEn: '20 days, subject to order confirmation',
      },
    ],
    bodyZh: [
      '照片展示的是配置示例。产品系列名称为泽锐的营销名称；最终以图纸与设备清单为准。',
      '黑曜石在临沂工厂按单制造为一台完整的户外厨房舱：结构、顶篷、柜体与约定设备作为同一单元装配、检验，然后进行出口包装。尺寸、饰面与设备位置可在舱体结构内调整，最终配置在生产前书面确认。',
      '订购从一台开始。告知目的港与安装计划，我们会在报价中确认包装尺寸、毛重与装柜方案，以及你的配置所需的现场准备——平整基础、给排水点位与电气或燃气供应。',
      '经销商可以先以一台黑曜石作为展厅样机，再围绕它建立区域产品线；项目买家可以把同一配置复制到多个场地，保持一致的安装与饰面。',
    ],
    bodyEn: [
      'Photographs illustrate example configurations. Product series names are ZERUI marketing names; final drawings and equipment lists govern production.',
      'The Obsidian is built to order at our Linyi factory as a complete outdoor kitchen pod: the structure, canopy, cabinetry and agreed equipment are assembled and checked as one unit before export packing. Dimensions, finishes and equipment positions can be adjusted within the pod structure, and the final configuration is confirmed in writing before production.',
      'Ordering starts with a single unit. Share your destination port and installation plans, and we will confirm packed dimensions, gross weight and a container loading plan with your quotation, together with the site preparation your configuration needs — a level foundation, water and drainage points, and the electrical or gas supply.',
      'Dealers can start with one Obsidian unit as a showroom display and build a regional range around it; project buyers can repeat the same configuration across multiple sites with identical fit and finish.',
    ],
    related: ['lumiere', 'copper-studio', 'chef-edition'],
  },
  {
    slug: 'lumiere',
    fullEn: 'Lumière integrated outdoor kitchen pod',
    seriesZh: '庭院收藏',
    seriesEn: 'Courtyard collection',
    nameZh: '卢米埃尔',
    nameEn: 'Lumière',
    image: 'project01',
    altZh: '夜间灯光下的卢米埃尔户外厨房舱，庭院铺装与木质围栏',
    altEn: 'Lumière outdoor kitchen pod lit at night on a paved courtyard with timber fencing',
    leadZh: '浅色饰面的精致厨房舱，四周带照明，烹饪区简洁流畅。适合别墅、露台与户外餐饮场所，是自然的视觉焦点。',
    leadEn:
      'A refined light-toned kitchen pod with perimeter illumination and a streamlined cooking zone. A welcoming focal point for villas, patios and outdoor hospitality.',
    featuresZh: ['浅色柜体饰面', '集成氛围照明', '烹饪与备餐区', '可选冷藏与实用配置'],
    featuresEn: [
      'Light cabinet finish',
      'Integrated ambient lighting',
      'Cooking and preparation area',
      'Refrigeration and utility options',
    ],
    asideZh: '顶篷收起时，卢米埃尔收拢为带锁万向轮上的整洁、耐候柜体。',
    asideEn: 'Canopy closed: the Lumière seals into a clean, weather-tight cabinet on lockable castors.',
    specs: [
      {
        labelZh: '结构',
        labelEn: 'Structure',
        valueZh: '内外均为 304 不锈钢结构；台面为 304 不锈钢或石英石',
        valueEn:
          '304 stainless steel construction, inside and out; countertop in 304 stainless steel or quartz stone',
      },
      {
        labelZh: '尺寸',
        labelEn: 'Dimensions',
        valueZh: '2.85 × 0.73 × 2.28 m（宽 × 深 × 高）；单台重量 800 kg',
        valueEn: '2.85 × 0.73 × 2.28 m (W × D × H); unit weight 800 kg',
      },
      {
        labelZh: '顶篷',
        labelEn: 'Canopy',
        valueZh: '可升降顶篷，带氛围与操作照明',
        valueEn: 'Lift-up canopy with ambient and task lighting',
      },
      {
        labelZh: '设备',
        labelEn: 'Appliances',
        valueZh:
          '304 不锈钢燃气/炭烤炉、电磁炉、烟机、冰箱、水槽、吊柜与嵌入式蓝牙音响',
        valueEn:
          '304 stainless steel gas/charcoal grill, induction hob, range hood, refrigerator, sink, wall cabinet and embedded Bluetooth audio',
      },
      {
        labelZh: '移动',
        labelEn: 'Mobility',
        valueZh: '可调支撑脚 × 4 与带刹车重型万向轮 × 4',
        valueEn: 'Adjustable support legs × 4 and heavy-duty swivel castors with brakes × 4',
      },
      {
        labelZh: '电气与燃气',
        labelEn: 'Electrical & gas',
        valueZh:
          '电气规格可选 110V 或 220V，按目的地市场接线；燃气设备与接口按目的地确认',
        valueEn:
          'Electrical specification available in 110V or 220V, wired for your destination market; gas equipment and connection requirements confirmed per destination',
      },
      {
        labelZh: '包装与运输',
        labelEn: 'Packing & shipping',
        valueZh: '包装尺寸 2.93 × 0.78 × 2.46 m；包装重量 900 kg；装柜方案在报价时确认',
        valueEn:
          'Packed size 2.93 × 0.78 × 2.46 m; packed weight 900 kg; container plan confirmed at quotation',
      },
      {
        labelZh: '最小起订',
        labelEn: 'Minimum order',
        valueZh: '1 台',
        valueEn: '1 unit',
      },
      {
        labelZh: '标准生产',
        labelEn: 'Standard production',
        valueZh: '20 天，以订单确认为准',
        valueEn: '20 days, subject to order confirmation',
      },
    ],
    bodyZh: [
      '照片展示的是配置示例。产品系列名称为泽锐的营销名称；最终以图纸与设备清单为准。',
      '卢米埃尔在临沂工厂按单制造为一台完整的户外厨房舱：结构、顶篷、柜体与约定设备作为同一单元装配、检验，然后进行出口包装。尺寸、饰面与设备位置可在舱体结构内调整，最终配置在生产前书面确认。',
      '订购从一台开始。告知目的港与安装计划，包装尺寸与包装重量已列在上表，我们会在报价中确认装柜方案，以及你的配置所需的现场准备——平整基础、给排水点位与电气或燃气供应。',
      '经销商可以先以一台卢米埃尔作为展厅样机，再围绕它建立区域产品线；项目买家可以把同一配置复制到多个场地，保持一致的安装与饰面。',
    ],
    bodyEn: [
      'Photographs illustrate example configurations. Product series names are ZERUI marketing names; final drawings and equipment lists govern production.',
      'The Lumière is built to order at our Linyi factory as a complete outdoor kitchen pod: the structure, canopy, cabinetry and agreed equipment are assembled and checked as one unit before export packing. Dimensions, finishes and equipment positions can be adjusted within the pod structure, and the final configuration is confirmed in writing before production.',
      'Ordering starts with a single unit. Share your destination port and installation plans, and the packed dimensions and packed weight are listed above, and we will confirm a container loading plan with your quotation, together with the site preparation your configuration needs — a level foundation, water and drainage points, and the electrical or gas supply.',
      'Dealers can start with one Lumière unit as a showroom display and build a regional range around it; project buyers can repeat the same configuration across multiple sites with identical fit and finish.',
    ],
    related: ['obsidian', 'copper-studio', 'chef-edition'],
  },
  {
    slug: 'copper-studio',
    fullEn: 'Copper Studio integrated outdoor kitchen pod',
    seriesZh: '娱乐收藏',
    seriesEn: 'Entertainment collection',
    nameZh: 'Copper Studio',
    nameEn: 'Copper Studio',
    image: 'cabinets',
    altZh: 'Copper Studio 户外厨房舱，铜色木纹饰面，集成烤炉、电视与冷藏',
    altEn:
      'Copper Studio outdoor kitchen pod with copper-toned timber finish, built-in grill, TV and refrigeration',
    leadZh: '温暖金属色调与木纹柜体，构成富有表现力的户外娱乐台。图示配置包含屏幕、烤炉、水槽与冰箱。',
    leadEn:
      'Warm metallic tones and wood-look cabinetry create an expressive outdoor entertaining station. The pictured configuration incorporates a screen, grill, sink and refrigerator.',
    featuresZh: ['铜色外观', '木纹柜体门板', '可选屏幕与音响配置', '集成照明与收纳'],
    featuresEn: [
      'Copper-tone exterior',
      'Wood-look cabinet fronts',
      'Screen and audio configuration available',
      'Integrated lighting and storage',
    ],
    specs: [
      {
        labelZh: '结构',
        labelEn: 'Structure',
        valueZh: '不锈钢结构，铜色与木纹饰面；烧结石台面',
        valueEn:
          'Stainless steel construction with copper-tone and wood-look finishes; sintered stone countertop',
      },
      {
        labelZh: '尺寸',
        labelEn: 'Dimensions',
        valueZh: '可定制与标准占地面积；可索取图纸',
        valueEn: 'Custom and standard footprints available; drawing on request',
      },
      {
        labelZh: '顶篷',
        labelEn: 'Canopy',
        valueZh: '手动液压升降顶篷',
        valueEn: 'Manual hydraulic lift-up canopy',
      },
      {
        labelZh: '标准配置',
        labelEn: 'Standard configuration',
        valueZh:
          '304 不锈钢炭烤炉、冰箱、烟机、电磁炉、烧结石台面、304 不锈钢台下盆与即热龙头、蓝牙音响、可调脚与万向轮、配电箱与内部水路',
        valueEn:
          '304 stainless steel charcoal grill, refrigerator, range hood, induction hob, sintered stone countertop, 304 stainless steel undermount sink with instant hot-water faucet, Bluetooth audio, adjustable feet and swivel castors, distribution box and integrated internal water lines',
      },
      {
        labelZh: '可选升级',
        labelEn: 'Optional upgrades',
        valueZh:
          '电视屏幕、电动拉篮、玻璃盖可视烤炉、六头烤炉、燃气边炉、陶瓷 Kamado 炉、披萨炉、铁板与铁板烧盘、地锅、遥控电动门与星空顶',
        valueEn:
          'Television screen, electric pull-out basket, glass-lid visual grill, six-burner grill, gas side burner, ceramic kamado cooker, pizza oven, griddle and teppanyaki plates, ground pot cooker, remote-controlled electric opening doors and starlight ceiling',
      },
      {
        labelZh: '电气与燃气',
        labelEn: 'Electrical & gas',
        valueZh: '按目的地设备与接口要求配置',
        valueEn: 'Destination-specific equipment and connection requirements',
      },
      {
        labelZh: '包装与运输',
        labelEn: 'Packing & shipping',
        valueZh: '包装尺寸、毛重与装柜方案在报价时确认',
        valueEn: 'Packed size, gross weight and container plan confirmed at quotation',
      },
      {
        labelZh: '最小起订',
        labelEn: 'Minimum order',
        valueZh: '1 台',
        valueEn: '1 unit',
      },
      {
        labelZh: '标准生产',
        labelEn: 'Standard production',
        valueZh: '20 天，以订单确认为准',
        valueEn: '20 days, subject to order confirmation',
      },
    ],
    bodyZh: [
      '照片展示的是配置示例。产品系列名称为泽锐的营销名称；最终以图纸与设备清单为准。',
      'Copper Studio 在临沂工厂按单制造为一台完整的户外厨房舱：结构、顶篷、柜体与约定设备作为同一单元装配、检验，然后进行出口包装。尺寸、饰面与设备位置可在舱体结构内调整，最终配置在生产前书面确认。',
      '订购从一台开始。告知目的港与安装计划，我们会在报价中确认包装尺寸、毛重与装柜方案，以及你的配置所需的现场准备——平整基础、给排水点位与电气或燃气供应。',
      '经销商可以先以一台 Copper Studio 作为展厅样机，再围绕它建立区域产品线；项目买家可以把同一配置复制到多个场地，保持一致的安装与饰面。',
    ],
    bodyEn: [
      'Photographs illustrate example configurations. Product series names are ZERUI marketing names; final drawings and equipment lists govern production.',
      'The Copper Studio is built to order at our Linyi factory as a complete outdoor kitchen pod: the structure, canopy, cabinetry and agreed equipment are assembled and checked as one unit before export packing. Dimensions, finishes and equipment positions can be adjusted within the pod structure, and the final configuration is confirmed in writing before production.',
      'Ordering starts with a single unit. Share your destination port and installation plans, and we will confirm packed dimensions, gross weight and a container loading plan with your quotation, together with the site preparation your configuration needs — a level foundation, water and drainage points, and the electrical or gas supply.',
      'Dealers can start with one Copper Studio unit as a showroom display and build a regional range around it; project buyers can repeat the same configuration across multiple sites with identical fit and finish.',
    ],
    related: ['obsidian', 'lumiere', 'chef-edition'],
  },
  {
    slug: 'chef-edition',
    fullEn: 'Chef Edition integrated outdoor kitchen pod',
    seriesZh: '烹饪收藏',
    seriesEn: 'Cooking collection',
    nameZh: '厨师版',
    nameEn: 'Chef Edition',
    image: 'grills',
    altZh: '厨师版户外厨房舱，双烹饪设备，不锈钢烤炉与嵌入式烟机',
    altEn: 'Chef Edition outdoor kitchen pod with dual cooking equipment, stainless grill and built-in hood',
    leadZh: '以烹饪为核心的灵活厨房，图示配置把烤炉与陶瓷炉并置，旁边配水槽、操作台与冷藏空间。',
    leadEn:
      'A versatile cooking-focused kitchen combining a grill with a ceramic cooker in the pictured configuration, alongside a sink, worktop and refrigeration space.',
    featuresZh: ['多炉具布局', '专属备餐台面', '集成水槽与柜体', '可升降顶篷'],
    featuresEn: [
      'Multi-cooker layout',
      'Dedicated preparation surface',
      'Integrated sink and cabinetry',
      'Lift-up canopy',
    ],
    specs: [
      {
        labelZh: '结构',
        labelEn: 'Structure',
        valueZh: '内外均为 304 不锈钢结构；台面为 304 不锈钢或石英石',
        valueEn:
          '304 stainless steel construction, inside and out; countertop in 304 stainless steel or quartz stone',
      },
      {
        labelZh: '尺寸',
        labelEn: 'Dimensions',
        valueZh: '3.50 × 0.73 × 2.28 m（宽 × 深 × 高）；单台重量 900 kg',
        valueEn: '3.50 × 0.73 × 2.28 m (W × D × H); unit weight 900 kg',
      },
      {
        labelZh: '顶篷',
        labelEn: 'Canopy',
        valueZh: '可升降顶篷，带氛围与操作照明',
        valueEn: 'Lift-up canopy with ambient and task lighting',
      },
      {
        labelZh: '设备',
        labelEn: 'Appliances',
        valueZh:
          '304 不锈钢燃气/炭烤炉、电磁炉、烟机、冰箱、水槽、吊柜与嵌入式蓝牙音响；可选陶瓷炉',
        valueEn:
          '304 stainless steel gas/charcoal grill, induction hob, range hood, refrigerator, sink, wall cabinet and embedded Bluetooth audio; ceramic cooker available as an option',
      },
      {
        labelZh: '移动',
        labelEn: 'Mobility',
        valueZh: '可调支撑脚 × 4 与带刹车重型万向轮 × 4',
        valueEn: 'Adjustable support legs × 4 and heavy-duty swivel castors with brakes × 4',
      },
      {
        labelZh: '电气与燃气',
        labelEn: 'Electrical & gas',
        valueZh:
          '电气规格可选 110V 或 220V，按目的地市场接线；燃气设备与接口按目的地确认',
        valueEn:
          'Electrical specification available in 110V or 220V, wired for your destination market; gas equipment and connection requirements confirmed per destination',
      },
      {
        labelZh: '包装与运输',
        labelEn: 'Packing & shipping',
        valueZh: '包装尺寸 3.58 × 0.78 × 2.46 m；包装重量 1,030 kg；装柜方案在报价时确认',
        valueEn:
          'Packed size 3.58 × 0.78 × 2.46 m; packed weight 1,030 kg; container plan confirmed at quotation',
      },
      {
        labelZh: '最小起订',
        labelEn: 'Minimum order',
        valueZh: '1 台',
        valueEn: '1 unit',
      },
      {
        labelZh: '标准生产',
        labelEn: 'Standard production',
        valueZh: '20 天，以订单确认为准',
        valueEn: '20 days, subject to order confirmation',
      },
    ],
    bodyZh: [
      '照片展示的是配置示例。产品系列名称为泽锐的营销名称；最终以图纸与设备清单为准。',
      '厨师版在临沂工厂按单制造为一台完整的户外厨房舱：结构、顶篷、柜体与约定设备作为同一单元装配、检验，然后进行出口包装。尺寸、饰面与设备位置可在舱体结构内调整，最终配置在生产前书面确认。',
      '订购从一台开始。告知目的港与安装计划，包装尺寸与包装重量已列在上表，我们会在报价中确认装柜方案，以及你的配置所需的现场准备——平整基础、给排水点位与电气或燃气供应。',
      '经销商可以先以一台厨师版作为展厅样机，再围绕它建立区域产品线；项目买家可以把同一配置复制到多个场地，保持一致的安装与饰面。',
    ],
    bodyEn: [
      'Photographs illustrate example configurations. Product series names are ZERUI marketing names; final drawings and equipment lists govern production.',
      'The Chef Edition is built to order at our Linyi factory as a complete outdoor kitchen pod: the structure, canopy, cabinetry and agreed equipment are assembled and checked as one unit before export packing. Dimensions, finishes and equipment positions can be adjusted within the pod structure, and the final configuration is confirmed in writing before production.',
      'Ordering starts with a single unit. Share your destination port and installation plans, and the packed dimensions and packed weight are listed above, and we will confirm a container loading plan with your quotation, together with the site preparation your configuration needs — a level foundation, water and drainage points, and the electrical or gas supply.',
      'Dealers can start with one Chef Edition unit as a showroom display and build a regional range around it; project buyers can repeat the same configuration across multiple sites with identical fit and finish.',
    ],
    related: ['obsidian', 'lumiere', 'copper-studio'],
  },
  {
    slug: 'mirror-edition',
    fullEn: 'Mirror Edition integrated outdoor kitchen pod',
    seriesZh: '建筑收藏',
    seriesEn: 'Architectural collection',
    nameZh: '镜像版',
    nameEn: 'Mirror Edition',
    image: 'project02',
    altZh: '镜像版户外厨房舱，镜面不锈钢外壳，抬起式顶篷与集成烤炉',
    altEn: 'Mirror Edition outdoor kitchen pod with mirror-polished stainless shell, lift-up canopy and built-in grill',
    leadZh: '反光金属饰面与当代柜体设计，让这台厨房舱具有鲜明的建筑存在感。图示单元整合了多种烹饪与备餐功能。',
    leadEn:
      'A reflective metal finish and contemporary cabinet design give this kitchen pod a distinctive architectural presence. The pictured unit combines several cooking and preparation functions.',
    featuresZh: ['反光金属饰面', '集成烧烤台', '可选附加烹饪设备', '收纳与冷藏布局'],
    featuresEn: [
      'Reflective metal finish',
      'Integrated grill station',
      'Additional cooking appliance option',
      'Storage and refrigeration layout',
    ],
    specs: [
      {
        labelZh: '结构',
        labelEn: 'Structure',
        valueZh: '内外均为 304 不锈钢结构',
        valueEn: '304 stainless steel construction, inside and out',
      },
      {
        labelZh: '尺寸',
        labelEn: 'Dimensions',
        valueZh: '可定制与标准占地面积；可索取图纸',
        valueEn: 'Custom and standard footprints available; drawing on request',
      },
      {
        labelZh: '顶篷',
        labelEn: 'Canopy',
        valueZh: '可升降结构；操作系统在生产前书面确认',
        valueEn: 'Lift-up configuration; operating system confirmed in writing before production',
      },
      {
        labelZh: '设备',
        labelEn: 'Appliances',
        valueZh: '按目的地市场约定',
        valueEn: 'As agreed for destination market',
      },
      {
        labelZh: '电气与燃气',
        labelEn: 'Electrical & gas',
        valueZh: '按目的地设备与接口要求配置',
        valueEn: 'Destination-specific equipment and connection requirements',
      },
      {
        labelZh: '包装与运输',
        labelEn: 'Packing & shipping',
        valueZh: '包装尺寸、毛重与装柜方案在报价时确认',
        valueEn: 'Packed size, gross weight and container plan confirmed at quotation',
      },
      {
        labelZh: '最小起订',
        labelEn: 'Minimum order',
        valueZh: '1 台',
        valueEn: '1 unit',
      },
      {
        labelZh: '标准生产',
        labelEn: 'Standard production',
        valueZh: '20 天，以订单确认为准',
        valueEn: '20 days, subject to order confirmation',
      },
    ],
    bodyZh: [
      '照片展示的是配置示例。产品系列名称为泽锐的营销名称；最终以图纸与设备清单为准。',
      '镜像版在临沂工厂按单制造为一台完整的户外厨房舱：结构、顶篷、柜体与约定设备作为同一单元装配、检验，然后进行出口包装。尺寸、饰面与设备位置可在舱体结构内调整，最终配置在生产前书面确认。',
      '订购从一台开始。告知目的港与安装计划，我们会在报价中确认包装尺寸、毛重与装柜方案，以及你的配置所需的现场准备——平整基础、给排水点位与电气或燃气供应。',
      '经销商可以先以一台镜像版作为展厅样机，再围绕它建立区域产品线；项目买家可以把同一配置复制到多个场地，保持一致的安装与饰面。',
    ],
    bodyEn: [
      'Photographs illustrate example configurations. Product series names are ZERUI marketing names; final drawings and equipment lists govern production.',
      'The Mirror Edition is built to order at our Linyi factory as a complete outdoor kitchen pod: the structure, canopy, cabinetry and agreed equipment are assembled and checked as one unit before export packing. Dimensions, finishes and equipment positions can be adjusted within the pod structure, and the final configuration is confirmed in writing before production.',
      'Ordering starts with a single unit. Share your destination port and installation plans, and we will confirm packed dimensions, gross weight and a container loading plan with your quotation, together with the site preparation your configuration needs — a level foundation, water and drainage points, and the electrical or gas supply.',
      'Dealers can start with one Mirror Edition unit as a showroom display and build a regional range around it; project buyers can repeat the same configuration across multiple sites with identical fit and finish.',
    ],
    related: ['obsidian', 'lumiere', 'copper-studio'],
  },
];
