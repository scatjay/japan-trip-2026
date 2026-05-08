(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // DH Solarized Light design tokens
  // ---------------------------------------------------------------------------
  const DS = {
    bg:     '#fdf6e3',
    fg:     '#073642',
    muted:  '#657b83',
    accent: '#b58900',
    card:   '#eee8d5',
    border: '#c8bfa7',
    blue:   '#268bd2',
    cyan:   '#2aa198',
    green:  '#859900',
    orange: '#cb4b16',
    red:    '#dc322f',
  };

  const CITY_COLOR = {
    '名古屋': DS.cyan,
    '京都':   DS.blue,
    '大阪':   DS.orange,
    '大阪→KHH': DS.orange,
  };

  // ---------------------------------------------------------------------------
  // Hotel data
  // ---------------------------------------------------------------------------
  const HOTELS = {
    A: { name: 'KOKO HOTEL 名古屋丸之內', lat: 35.1708, lng: 136.9099, nights: '7/13–7/17', color: DS.cyan },
    B: { name: 'To-Be（大須）',           lat: 35.1598, lng: 136.9028, nights: '7/17–7/20', color: DS.muted },
    C: { name: '京阪京都大酒店',           lat: 34.9869, lng: 135.7501, nights: '7/20–7/25', color: DS.blue },
    D: { name: 'Estate Kuromon Bekkan D', lat: 34.6628, lng: 135.5071, nights: '7/25–7/27', color: DS.orange },
  };

  // ---------------------------------------------------------------------------
  // Day waypoints
  // ---------------------------------------------------------------------------
  const DAYS = [
    { n:1, city:'名古屋', date:'7/13', title:'抵達名古屋', hotel:'A',
      waypoints:[
        { name:'中部國際機場', lat:35.2546, lng:136.9235, icon:'✈️', note:'21:05 抵達' },
        { name:'名古屋站', lat:35.1709, lng:136.8816, icon:'🚉', note:'名鐵 μ-SKY 30分' },
        { name:'KOKO HOTEL', lat:35.1708, lng:136.9099, icon:'🏨', note:'Check-in 22:00頃' },
      ]
    },
    { n:2, city:'名古屋', date:'7/14', title:'豐田館・美術館・Oasis21', hotel:'A',
      waypoints:[
        { name:'豐田産業技術紀念館', lat:35.1839, lng:136.8847, icon:'🏛', note:'10:00–13:00 ¥1,000' },
        { name:'愛知縣美術館', lat:35.1662, lng:136.9015, icon:'🎨', note:'14:30–17:00 ¥500' },
        { name:'Oasis21 + 電視塔', lat:35.1700, lng:136.9092, icon:'🌃', note:'夜景 ¥700' },
      ]
    },
    { n:3, city:'名古屋', date:'7/15', title:'科學館・名古屋城・大須', hotel:'A',
      waypoints:[
        { name:'名古屋市科學館', lat:35.1696, lng:136.8988, icon:'🔭', note:'09:30–14:30 ¥400+天幕¥800' },
        { name:'名古屋城', lat:35.1856, lng:136.8993, icon:'🏯', note:'15:00 ¥500' },
        { name:'大須觀音', lat:35.1587, lng:136.9042, icon:'🛕', note:'商店街 KONPARU 炸蝦' },
      ]
    },
    { n:4, city:'名古屋', date:'7/16', title:'吉卜力公園', hotel:'A',
      waypoints:[
        { name:'藤之丘站（換Linimo）', lat:35.1697, lng:137.0648, icon:'🚇', note:'地鐵東山線終點' },
        { name:'吉卜力公園', lat:35.1817, lng:137.0965, icon:'🌿', note:'10:00–17:00 需預約' },
      ]
    },
    { n:5, city:'名古屋', date:'7/17', title:'磁浮鐵道館・換飯店', hotel:'B',
      waypoints:[
        { name:'KOKO HOTEL（退房）', lat:35.1708, lng:136.9099, icon:'🧳', note:'09:30 退房' },
        { name:'リニア・鐵道館', lat:35.0671, lng:136.8880, icon:'🚄', note:'青波線 金城ふ頭站' },
        { name:'To-Be', lat:35.1598, lng:136.9028, icon:'🏨', note:'計程車 5–7分' },
      ]
    },
    { n:6, city:'名古屋', date:'7/18', title:'樂高樂園', hotel:'B',
      waypoints:[
        { name:'LEGOLAND Japan', lat:35.0713, lng:136.8893, icon:'🧱', note:'09:30 青波線 金城ふ頭' },
      ]
    },
    { n:7, city:'名古屋', date:'7/19', title:'名古屋港水族館', hotel:'B',
      waypoints:[
        { name:'名古屋港水族館', lat:35.0922, lng:136.8816, icon:'🐳', note:'09:30 地鐵名港線' },
        { name:'名古屋港 野花公園', lat:35.0920, lng:136.8850, icon:'🌸', note:'傍晚散步' },
      ]
    },
    { n:8, city:'京都', date:'7/20', title:'新幹線到京都', hotel:'C',
      waypoints:[
        { name:'名古屋站（出發）', lat:35.1709, lng:136.8816, icon:'🚄', note:'のぞみ 35分' },
        { name:'京都站', lat:34.9858, lng:135.7588, icon:'🚉', note:'抵達放行李' },
        { name:'青蓮院門跡', lat:35.0049, lng:135.7812, icon:'⛩', note:'夜楓燈籠（夏季夜間特別參拜）' },
        { name:'三十三間堂', lat:34.9882, lng:135.7751, icon:'🏛', note:'千體佛像' },
        { name:'京阪京都大酒店', lat:34.9869, lng:135.7501, icon:'🏨', note:'Check-in' },
      ]
    },
    { n:9, city:'京都', date:'7/21', title:'清水寺・祇園・錦市場', hotel:'C',
      waypoints:[
        { name:'清水寺', lat:34.9948, lng:135.7851, icon:'⛩', note:'10:00 開門' },
        { name:'二・三年坂', lat:34.9968, lng:135.7820, icon:'🏮', note:'坡道老街' },
        { name:'八坂塔（法觀寺）', lat:34.9972, lng:135.7800, icon:'🗼', note:'拍照必來' },
        { name:'AWOMB 祇園八坂', lat:35.0025, lng:135.7780, icon:'🍣', note:'12:00 預約午餐' },
        { name:'花見小路', lat:35.0034, lng:135.7756, icon:'🎭', note:'藝妓地區' },
        { name:'八坂神社', lat:35.0034, lng:135.7784, icon:'⛩', note:'祇園總鎮守' },
        { name:'錦市場', lat:35.0047, lng:135.7654, icon:'🛒', note:'京都廚房 300m 長' },
      ]
    },
    { n:10, city:'京都', date:'7/22', title:'嵐山・金閣寺', hotel:'C',
      waypoints:[
        { name:'嵐山渡月橋', lat:35.0116, lng:135.6776, icon:'🌉', note:'嵐電到嵐山站' },
        { name:'天龍寺', lat:35.0167, lng:135.6725, icon:'🏯', note:'世界遺產庭園 ¥500' },
        { name:'竹林之道', lat:35.0175, lng:135.6717, icon:'🎋', note:'早去人少' },
        { name:'野宮神社', lat:35.0165, lng:135.6716, icon:'⛩', note:'戀愛祈求' },
        { name:'龍安寺', lat:35.0341, lng:135.7183, icon:'🪨', note:'枯山水 ¥600' },
        { name:'金閣寺', lat:35.0394, lng:135.7292, icon:'✨', note:'¥500' },
      ]
    },
    { n:11, city:'京都', date:'7/23', title:'任天堂博物館・伏見稻荷', hotel:'C',
      waypoints:[
        { name:'任天堂博物館', lat:34.9333, lng:135.8052, icon:'🎮', note:'宇治市 小倉站 5分 抽選制' },
        { name:'伏見稻荷大社', lat:34.9671, lng:135.7727, icon:'⛩', note:'千本鳥居 傍晚人少' },
      ]
    },
    { n:12, city:'京都', date:'7/24', title:'祇園祭山鉾巡行', hotel:'C',
      waypoints:[
        { name:'四條河原町（觀祭位置）', lat:35.0041, lng:135.7700, icon:'🏮', note:'08:30 前佔位' },
        { name:'烏丸御池（出發點）', lat:35.0106, lng:135.7575, icon:'🎺', note:'09:30 出發' },
        { name:'國立近代美術館', lat:35.0109, lng:135.7688, icon:'🎨', note:'下午參觀' },
        { name:'寺町通', lat:35.0070, lng:135.7680, icon:'🛍', note:'骨董街' },
      ]
    },
    { n:13, city:'大阪', date:'7/25', title:'新幹線到大阪・道頓堀', hotel:'D',
      waypoints:[
        { name:'京都站（出發）', lat:34.9858, lng:135.7588, icon:'🚄', note:'JR 到新大阪 or 難波' },
        { name:'道頓堀', lat:34.6687, lng:135.5025, icon:'🦞', note:'グリコ看板！' },
        { name:'美國村', lat:34.6729, lng:135.4990, icon:'🎸', note:'潮流雜貨' },
        { name:'心齋橋', lat:34.6729, lng:135.5019, icon:'🛍', note:'購物大街' },
        { name:'黑門市場', lat:34.6628, lng:135.5071, icon:'🐟', note:'海鮮立食' },
        { name:'Estate Kuromon', lat:34.6628, lng:135.5071, icon:'🏨', note:'Check-in' },
      ]
    },
    { n:14, city:'大阪', date:'7/26', title:'中之島・陶磁美術館・心齋橋', hotel:'D',
      waypoints:[
        { name:'中之島', lat:34.6935, lng:135.5013, icon:'🌿', note:'散步 + 難波橋獅子' },
        { name:'大阪市立東洋陶磁美術館', lat:34.6937, lng:135.5019, icon:'🏛', note:'國寶油滴天目 ¥500 9:30–17:00' },
        { name:'心齋橋 / 道頓堀', lat:34.6729, lng:135.5019, icon:'🛍', note:'伴手禮最後掃貨' },
      ]
    },
    { n:15, city:'大阪→KHH', date:'7/27', title:'回台！CI177 20:35', hotel:'D',
      waypoints:[
        { name:'黑門市場', lat:34.6628, lng:135.5071, icon:'🛒', note:'最後採買' },
        { name:'大阪城', lat:34.6873, lng:135.5262, icon:'🏯', note:'¥600' },
        { name:'關西國際機場（KIX）', lat:34.4347, lng:135.2441, icon:'✈️', note:'17:30 前抵達！CI177 20:35' },
      ]
    },
  ];

  // ---------------------------------------------------------------------------
  // Module state
  // ---------------------------------------------------------------------------
  let map = null;
  let markers = [];
  let lines = [];

  // ---------------------------------------------------------------------------
  // Layer management
  // ---------------------------------------------------------------------------
  function clearLayers() {
    markers.forEach(function (m) { m.remove(); });
    lines.forEach(function (l) { l.remove(); });
    markers = [];
    lines = [];
  }

  // ---------------------------------------------------------------------------
  // Marker factories
  // ---------------------------------------------------------------------------
  function makeNumberMarker(n, color) {
    var html = [
      '<div style="',
      'width:30px;height:30px;',
      'border-radius:50%;',
      'background:', color, ';',
      'border:2.5px solid ', DS.bg, ';',
      'box-shadow:0 1px 4px rgba(7,54,66,0.35);',
      'display:flex;align-items:center;justify-content:center;',
      'font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;',
      'font-size:13px;font-weight:700;',
      'color:', DS.bg, ';',
      'line-height:1;',
      '">',
      n,
      '</div>',
    ].join('');

    return window.L.divIcon({
      html: html,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -17],
    });
  }

  function makeHotelMarker(letter, color) {
    var html = [
      '<div style="',
      'width:36px;height:36px;',
      'border-radius:4px;',
      'background:', color, ';',
      'border:2.5px solid ', DS.bg, ';',
      'box-shadow:0 2px 6px rgba(7,54,66,0.4);',
      'display:flex;align-items:center;justify-content:center;',
      'font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;',
      'font-size:14px;font-weight:800;',
      'color:', DS.bg, ';',
      'line-height:1;',
      '">',
      letter,
      '</div>',
    ].join('');

    return window.L.divIcon({
      html: html,
      className: '',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -20],
    });
  }

  // ---------------------------------------------------------------------------
  // Popup HTML builder
  // ---------------------------------------------------------------------------
  function buildPopupHtml(wp) {
    var gmUrl = 'https://maps.google.com/maps?q=' + wp.lat + ',' + wp.lng;
    return [
      '<div style="',
      'font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;',
      'background:', DS.card, ';',
      'border:1px solid ', DS.border, ';',
      'border-radius:6px;',
      'padding:10px 12px;',
      'min-width:160px;max-width:220px;',
      'color:', DS.fg, ';',
      '">',
      '<div style="font-size:18px;margin-bottom:4px;">', (wp.icon || '📍'), '</div>',
      '<div style="font-weight:700;font-size:13px;margin-bottom:4px;color:', DS.fg, ';">', escapeHtml(wp.name), '</div>',
      wp.note ? ('<div style="font-size:12px;color:' + DS.muted + ';margin-bottom:8px;">' + escapeHtml(wp.note) + '</div>') : '',
      '<a href="', gmUrl, '" target="_blank" rel="noopener noreferrer" style="',
      'display:inline-block;font-size:11px;font-weight:600;',
      'color:', DS.blue, ';text-decoration:none;',
      'border:1px solid ', DS.blue, ';',
      'border-radius:3px;padding:2px 7px;',
      '">Google Maps で開く</a>',
      '</div>',
    ].join('');
  }

  function buildHotelPopupHtml(letter, hotel) {
    var gmUrl = 'https://maps.google.com/maps?q=' + hotel.lat + ',' + hotel.lng;
    return [
      '<div style="',
      'font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;',
      'background:', DS.card, ';',
      'border:1px solid ', DS.border, ';',
      'border-radius:6px;',
      'padding:10px 12px;',
      'min-width:170px;max-width:230px;',
      'color:', DS.fg, ';',
      '">',
      '<div style="font-size:18px;margin-bottom:4px;">🏨</div>',
      '<div style="font-weight:700;font-size:13px;margin-bottom:2px;color:', DS.fg, ';">',
      escapeHtml(hotel.name), '</div>',
      '<div style="font-size:12px;color:', DS.muted, ';margin-bottom:8px;">', escapeHtml(hotel.nights), '</div>',
      '<a href="', gmUrl, '" target="_blank" rel="noopener noreferrer" style="',
      'display:inline-block;font-size:11px;font-weight:600;',
      'color:', DS.blue, ';text-decoration:none;',
      'border:1px solid ', DS.blue, ';',
      'border-radius:3px;padding:2px 7px;',
      '">Google Maps で開く</a>',
      '</div>',
    ].join('');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ---------------------------------------------------------------------------
  // showDay(dayNum)
  // ---------------------------------------------------------------------------
  function showDay(dayNum) {
    if (!map) return;
    clearLayers();

    var day = DAYS.find(function (d) { return d.n === dayNum; });
    if (!day) { console.warn('MapModule: no data for day', dayNum); return; }

    var routeColor = CITY_COLOR[day.city] || DS.accent;
    var latLngs = [];

    day.waypoints.forEach(function (wp, idx) {
      var num = idx + 1;
      var icon = makeNumberMarker(num, routeColor);
      var m = window.L.marker([wp.lat, wp.lng], { icon: icon });
      m.bindPopup(buildPopupHtml(wp), {
        maxWidth: 240,
        className: 'dh-popup',
      });
      m.addTo(map);
      markers.push(m);
      latLngs.push([wp.lat, wp.lng]);
    });

    if (latLngs.length >= 2) {
      var line = window.L.polyline(latLngs, {
        color: routeColor,
        weight: 3,
        opacity: 0.85,
        dashArray: '8 6',
        lineJoin: 'round',
      });
      line.addTo(map);
      lines.push(line);
    }

    if (latLngs.length > 0) {
      var bounds = window.L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 15 });
    }
  }

  // ---------------------------------------------------------------------------
  // showOverview()
  // ---------------------------------------------------------------------------
  function showOverview() {
    if (!map) return;
    clearLayers();

    // City cluster approximate bounding boxes (rough circles drawn as rectangles)
    var clusters = [
      { label: '名古屋', color: DS.cyan,   sw: [34.98, 136.83], ne: [35.26, 137.12] },
      { label: '京都',   color: DS.blue,   sw: [34.92, 135.65], ne: [35.06, 135.80] },
      { label: '大阪',   color: DS.orange, sw: [34.61, 135.47], ne: [34.72, 135.55] },
    ];

    clusters.forEach(function (c) {
      var rect = window.L.rectangle([c.sw, c.ne], {
        color: c.color,
        weight: 2,
        opacity: 0.6,
        fillColor: c.color,
        fillOpacity: 0.08,
        dashArray: '6 4',
      });
      rect.addTo(map);
      lines.push(rect);

      // City label tooltip (permanent)
      var center = [
        (c.sw[0] + c.ne[0]) / 2,
        (c.sw[1] + c.ne[1]) / 2,
      ];
      var labelIcon = window.L.divIcon({
        html: '<div style="' +
          'font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;' +
          'font-size:12px;font-weight:700;' +
          'color:' + c.color + ';' +
          'background:' + DS.bg + ';' +
          'border:1px solid ' + c.color + ';' +
          'border-radius:3px;padding:1px 6px;' +
          'white-space:nowrap;opacity:0.9;' +
          '">' + c.label + '</div>',
        className: '',
        iconAnchor: [0, 0],
      });
      var labelMarker = window.L.marker(center, { icon: labelIcon, interactive: false });
      labelMarker.addTo(map);
      markers.push(labelMarker);
    });

    // Hotel pins
    Object.keys(HOTELS).forEach(function (letter) {
      var h = HOTELS[letter];
      var icon = makeHotelMarker(letter, h.color);
      var m = window.L.marker([h.lat, h.lng], { icon: icon });
      m.bindPopup(buildHotelPopupHtml(letter, h), {
        maxWidth: 250,
        className: 'dh-popup',
      });
      m.addTo(map);
      markers.push(m);
    });

    // Fit to Japan extent covering all hotels
    var allPoints = Object.values(HOTELS).map(function (h) { return [h.lat, h.lng]; });
    allPoints.push([34.4347, 135.2441]); // KIX
    var bounds = window.L.latLngBounds(allPoints);
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 9 });
  }

  // ---------------------------------------------------------------------------
  // Inject popup style once
  // ---------------------------------------------------------------------------
  function injectPopupStyle() {
    if (document.getElementById('dh-map-style')) return;
    var style = document.createElement('style');
    style.id = 'dh-map-style';
    style.textContent = [
      '.dh-popup .leaflet-popup-content-wrapper {',
      '  background: transparent !important;',
      '  box-shadow: none !important;',
      '  padding: 0 !important;',
      '  border-radius: 8px !important;',
      '  overflow: hidden;',
      '}',
      '.dh-popup .leaflet-popup-content {',
      '  margin: 0 !important;',
      '}',
      '.dh-popup .leaflet-popup-tip-container {',
      '  display: none;',
      '}',
      '.leaflet-container {',
      '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;',
      '  background: ' + DS.bg + ';',
      '}',
    ].join('\n');
    document.head.appendChild(style);
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------
  window.MapModule = {

    init: function (containerId, options) {
      if (!window.L) {
        console.error('MapModule: Leaflet (window.L) is not loaded. Include leaflet.js before map_module.js.');
        return;
      }
      var el = document.getElementById(containerId);
      if (!el) {
        console.error('MapModule: element #' + containerId + ' not found.');
        return;
      }
      if (map) {
        map.remove();
        map = null;
      }

      // Strip any leftover Leaflet state so re-init never throws
      delete el._leaflet_id;
      delete el._leaflet;
      delete el._leaflet_events;
      var leafletClasses = Array.from(el.classList).filter(function(c){ return c.startsWith('leaflet-'); });
      leafletClasses.forEach(function(c){ el.classList.remove(c); });
      el.innerHTML = '';

      injectPopupStyle();

      var opts = options || {};
      map = window.L.map(containerId, {
        zoomControl: true,
        scrollWheelZoom: opts.scrollWheelZoom !== undefined ? opts.scrollWheelZoom : true,
        attributionControl: true,
      });

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      showOverview();
    },

    showDay: showDay,

    showOverview: showOverview,

    destroy: function () {
      if (map) {
        clearLayers();
        map.remove();
        map = null;
      }
    },

    getDayData: function (n) {
      return DAYS.find(function (d) { return d.n === n; });
    },

    getAllDays: function () {
      return DAYS.slice();
    },

    getHotels: function () {
      return Object.assign({}, HOTELS);
    },
  };

})();
