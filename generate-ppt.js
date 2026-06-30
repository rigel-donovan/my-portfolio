const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// Load JSON data
const loadJson = (file) => JSON.parse(fs.readFileSync(path.join(__dirname, "public/profile", file), "utf8"));
const home = loadJson("home.json");
const about = loadJson("about.json");
const education = loadJson("education.json");
const experiences = loadJson("experiences.json");
const organizational = loadJson("organizational.json");
const skills = loadJson("skills.json");
const projects = loadJson("projects.json");
const social = loadJson("social.json");

const IMG = path.join(__dirname, "public");

// Helper: resolve image path, skip if not found
function imgPath(relativePath) {
  const full = path.join(IMG, relativePath);
  if (fs.existsSync(full)) return full;
  console.warn(`⚠️ Image not found: ${full}`);
  return null;
}

// Create presentation
const prs = new pptxgen();
prs.defineLayout({ name: "WIDE", width: 13.33, height: 7.5 });
prs.layout = "WIDE";
prs.author = "Rigel Donovan Sayudha";
prs.title = "Portfolio - Rigel Donovan Sayudha";

// Color palette
const C = {
  dark: "0F172A", bg: "1E293B", accent: "3B82F6", accent2: "8B5CF6",
  text: "F8FAFC", sub: "94A3B8", card: "334155", white: "FFFFFF",
  green: "10B981", orange: "F59E0B", pink: "EC4899", cyan: "06B6D4",
};

// Helper: add decorative shapes
function addDecor(slide) {
  slide.addShape(prs.ShapeType.ellipse, { x: -1, y: -1, w: 3, h: 3, fill: { color: C.accent, transparency: 90 } });
  slide.addShape(prs.ShapeType.ellipse, { x: 11, y: 5.5, w: 3.5, h: 3.5, fill: { color: C.accent2, transparency: 90 } });
}

// Helper: section title bar
function addSectionBar(slide, title, emoji) {
  slide.addShape(prs.ShapeType.roundRect, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: C.bg }, rectRadius: 0 });
  slide.addText(`${emoji}  ${title}`, { x: 0.5, y: 0.15, w: 12, h: 0.8, fontSize: 28, bold: true, color: C.accent, fontFace: "Segoe UI" });
}

// Helper: add image with rounded card wrapper
function addImageCard(slide, imgSrc, x, y, w, h) {
  const p = imgPath(imgSrc);
  if (!p) return;
  slide.addShape(prs.ShapeType.roundRect, { x, y, w, h, fill: { color: C.card }, rectRadius: 0.12 });
  const pad = 0.08;
  slide.addImage({ path: p, x: x + pad, y: y + pad, w: w - pad * 2, h: h - pad * 2, rounding: true });
}

// ============ SLIDE 1: TITLE ============
let slide = prs.addSlide({ bkgd: C.dark });
addDecor(slide);

// Profile photo
const profileImg = imgPath("images/about/pas-foto.jpg");
if (profileImg) {
  slide.addShape(prs.ShapeType.ellipse, { x: 5.4, y: 0.4, w: 2.5, h: 2.5, fill: { color: C.card } });
  slide.addImage({ path: profileImg, x: 5.5, y: 0.5, w: 2.3, h: 2.3, rounding: true });
}

slide.addShape(prs.ShapeType.rect, { x: 4, y: 3.15, w: 5.33, h: 0.04, fill: { color: C.accent } });
slide.addText("PORTFOLIO", { x: 0, y: 3.3, w: 13.33, h: 0.6, align: "center", fontSize: 16, color: C.accent, fontFace: "Segoe UI", bold: true, charSpacing: 8 });
slide.addText("Rigel Donovan Sayudha", { x: 0, y: 3.8, w: 13.33, h: 1, align: "center", fontSize: 40, bold: true, color: C.white, fontFace: "Segoe UI" });
slide.addText("Bachelor of Computer Science", { x: 0, y: 4.7, w: 13.33, h: 0.6, align: "center", fontSize: 18, color: C.sub, fontFace: "Segoe UI" });

// Contact info row
const contactItems = [
  { icon: "📧", text: about.contact.email },
  { icon: "📱", text: about.contact.phone },
  { icon: "🔗", text: "linkedin.com/in/rigel-donovan" },
  { icon: "🌐", text: "portfolio-rigel.vercel.app" },
];
const contactText = contactItems.map(c => `${c.icon} ${c.text}`).join("     |     ");
slide.addText(contactText, { x: 0.5, y: 5.8, w: 12.33, h: 0.5, align: "center", fontSize: 11, color: C.sub, fontFace: "Segoe UI" });

// ============ SLIDE 2: ABOUT ME ============
slide = prs.addSlide({ bkgd: C.dark });
addDecor(slide);
addSectionBar(slide, "ABOUT ME", "👤");

// Profile photo on right
const aboutImages = about.imageSources || [];
if (aboutImages.length > 0) {
  const mainAboutImg = imgPath(aboutImages[0]);
  if (mainAboutImg) {
    slide.addShape(prs.ShapeType.roundRect, { x: 9, y: 1.4, w: 3.5, h: 4.2, fill: { color: C.card }, rectRadius: 0.15 });
    slide.addImage({ path: mainAboutImg, x: 9.15, y: 1.55, w: 3.2, h: 3.9, rounding: true });
  }
}

// Graduation photos at bottom-right
for (let i = 1; i < Math.min(aboutImages.length, 3); i++) {
  const abImg = imgPath(aboutImages[i]);
  if (abImg) {
    const xOff = 9 + (i - 1) * 2.1;
    slide.addShape(prs.ShapeType.roundRect, { x: xOff, y: 5.8, w: 1.9, h: 1.4, fill: { color: C.card }, rectRadius: 0.1 });
    slide.addImage({ path: abImg, x: xOff + 0.05, y: 5.85, w: 1.8, h: 1.3, rounding: true });
  }
}

slide.addText(about.about, { x: 0.8, y: 1.4, w: 7.8, h: 2.2, fontSize: 13, color: C.text, fontFace: "Segoe UI", lineSpacingMultiple: 1.5, valign: "top" });

// Education box
slide.addShape(prs.ShapeType.roundRect, { x: 0.8, y: 3.9, w: 7.8, h: 1.6, fill: { color: C.card }, rectRadius: 0.15 });
slide.addText("🎓 Education", { x: 1.1, y: 4.0, w: 5, h: 0.45, fontSize: 15, bold: true, color: C.accent, fontFace: "Segoe UI" });
slide.addText(`${about.education.degree}\n${about.education.institution}\n${about.education.year}  •  GPA: ${about.education.gpa}`, {
  x: 1.1, y: 4.4, w: 7.2, h: 1, fontSize: 12, color: C.text, fontFace: "Segoe UI", lineSpacingMultiple: 1.3
});

// Soft Skills box
slide.addShape(prs.ShapeType.roundRect, { x: 0.8, y: 5.8, w: 7.8, h: 1.4, fill: { color: C.card }, rectRadius: 0.15 });
slide.addText("💡 Soft Skills", { x: 1.1, y: 5.85, w: 3, h: 0.4, fontSize: 14, bold: true, color: C.accent, fontFace: "Segoe UI" });
const skillsRow = about.skills.map(s => `•  ${s}`).join("     ");
slide.addText(skillsRow, { x: 1.1, y: 6.3, w: 7.2, h: 0.7, fontSize: 11, color: C.text, fontFace: "Segoe UI", valign: "top" });

// ============ SLIDE 3: EDUCATION ============
slide = prs.addSlide({ bkgd: C.dark });
addDecor(slide);
addSectionBar(slide, "EDUCATION", "🎓");

education.education.forEach((edu, i) => {
  const yPos = 1.5 + i * 2.8;
  slide.addShape(prs.ShapeType.roundRect, { x: 1, y: yPos, w: 11, h: 2.4, fill: { color: C.card }, rectRadius: 0.15 });
  slide.addShape(prs.ShapeType.roundRect, { x: 1, y: yPos, w: 0.12, h: 2.4, fill: { color: C.accent }, rectRadius: 0 });

  // Education icon/image
  if (edu.icon && edu.icon.src) {
    const eduImg = imgPath(edu.icon.src);
    if (eduImg) {
      slide.addImage({ path: eduImg, x: 1.5, y: yPos + 0.3, w: 1.6, h: 1.6, rounding: true });
    }
  }

  const textX = (edu.icon && edu.icon.src) ? 3.5 : 1.5;
  slide.addText(edu.cardTitle, { x: textX, y: yPos + 0.2, w: 7, h: 0.5, fontSize: 18, bold: true, color: C.white, fontFace: "Segoe UI" });
  slide.addText(edu.cardSubtitle, { x: textX, y: yPos + 0.7, w: 7, h: 0.45, fontSize: 14, color: C.sub, fontFace: "Segoe UI" });
  slide.addText(edu.cardDetailedText, { x: textX, y: yPos + 1.2, w: 7, h: 0.4, fontSize: 13, color: C.green, fontFace: "Segoe UI", bold: true });
  slide.addText(edu.title, { x: 8, y: yPos + 0.2, w: 3.5, h: 0.5, fontSize: 12, color: C.accent, fontFace: "Segoe UI", align: "right", bold: true });
});

// ============ WORK EXPERIENCE - one slide per experience ============
const workExps = experiences.experiences;
workExps.forEach((exp, idx) => {
  slide = prs.addSlide({ bkgd: C.dark });
  addDecor(slide);
  addSectionBar(slide, "WORK EXPERIENCE", "💼");

  const accentColors = [C.accent, C.green, C.orange, C.pink, C.cyan];
  const expColor = accentColors[idx % accentColors.length];

  // Left side: text content
  slide.addShape(prs.ShapeType.roundRect, { x: 0.8, y: 1.3, w: 7.2, h: 5.8, fill: { color: C.card }, rectRadius: 0.15 });
  slide.addShape(prs.ShapeType.roundRect, { x: 0.8, y: 1.3, w: 0.12, h: 5.8, fill: { color: expColor }, rectRadius: 0 });

  slide.addText(exp.title, { x: 1.3, y: 1.4, w: 6.4, h: 0.5, fontSize: 20, bold: true, color: C.white, fontFace: "Segoe UI" });
  slide.addText(`${exp.subtitle2}  •  ${exp.workType}`, { x: 1.3, y: 1.9, w: 6.4, h: 0.4, fontSize: 12, color: C.sub, fontFace: "Segoe UI" });
  slide.addText(exp.dateText, { x: 1.3, y: 2.3, w: 6.4, h: 0.35, fontSize: 12, color: expColor, fontFace: "Segoe UI", bold: true });

  // Company description
  if (exp.companyDescription) {
    slide.addText(exp.companyDescription, { x: 1.3, y: 2.8, w: 6.4, h: 0.8, fontSize: 10.5, color: C.sub, fontFace: "Segoe UI", italic: true, lineSpacingMultiple: 1.3, valign: "top" });
  }

  // Work descriptions as bullet list
  const descText = exp.workDescription.map(d => `•  ${d}`).join("\n");
  slide.addText(descText, { x: 1.3, y: 3.7, w: 6.4, h: 3.2, fontSize: 11, color: C.text, fontFace: "Segoe UI", lineSpacingMultiple: 1.4, valign: "top" });

  // Right side: images gallery
  const expImages = exp.images || [];
  const validImages = expImages.filter(img => {
    const src = typeof img === "string" ? img : (img && img.src ? img.src : null);
    return src && imgPath(src);
  });

  if (validImages.length > 0) {
    // Main large image
    const mainSrc = typeof validImages[0] === "string" ? validImages[0] : validImages[0].src;
    const mainImg = imgPath(mainSrc);
    if (mainImg) {
      slide.addShape(prs.ShapeType.roundRect, { x: 8.3, y: 1.3, w: 4.5, h: 3.2, fill: { color: C.card }, rectRadius: 0.12 });
      slide.addImage({ path: mainImg, x: 8.4, y: 1.4, w: 4.3, h: 3, rounding: true });
    }

    // Thumbnail row below
    const thumbs = validImages.slice(1, 4);
    const thumbW = 1.35;
    const thumbGap = 0.1;
    const startX = 8.3;
    thumbs.forEach((img, ti) => {
      const src = typeof img === "string" ? img : img.src;
      const tImg = imgPath(src);
      if (tImg) {
        const tx = startX + ti * (thumbW + thumbGap);
        slide.addShape(prs.ShapeType.roundRect, { x: tx, y: 4.7, w: thumbW, h: 1.1, fill: { color: C.card }, rectRadius: 0.08 });
        slide.addImage({ path: tImg, x: tx + 0.04, y: 4.74, w: thumbW - 0.08, h: 1.02, rounding: true });
      }
    });
  }
});

// ============ ORGANIZATIONAL EXPERIENCE - one slide per org ============
organizational.experiences.forEach((org, idx) => {
  slide = prs.addSlide({ bkgd: C.dark });
  addDecor(slide);
  addSectionBar(slide, "ORGANIZATIONAL EXPERIENCE", "🤝");

  const orgColor = [C.green, C.cyan][idx % 2];

  // Left side: text
  slide.addShape(prs.ShapeType.roundRect, { x: 0.8, y: 1.3, w: 7.2, h: 5.8, fill: { color: C.card }, rectRadius: 0.15 });
  slide.addShape(prs.ShapeType.roundRect, { x: 0.8, y: 1.3, w: 0.12, h: 5.8, fill: { color: orgColor }, rectRadius: 0 });

  slide.addText(org.title, { x: 1.3, y: 1.4, w: 6.4, h: 0.5, fontSize: 20, bold: true, color: C.white, fontFace: "Segoe UI" });
  slide.addText(`${org.subtitle}  •  ${org.subtitle2}`, { x: 1.3, y: 1.9, w: 6.4, h: 0.4, fontSize: 12, color: C.sub, fontFace: "Segoe UI" });
  slide.addText(org.dateText, { x: 1.3, y: 2.3, w: 6.4, h: 0.35, fontSize: 12, color: orgColor, fontFace: "Segoe UI", bold: true });

  if (org.companyDescription) {
    slide.addText(org.companyDescription, { x: 1.3, y: 2.8, w: 6.4, h: 0.8, fontSize: 10.5, color: C.sub, fontFace: "Segoe UI", italic: true, lineSpacingMultiple: 1.3, valign: "top" });
  }

  const descText = org.workDescription.map(d => `•  ${d}`).join("\n");
  slide.addText(descText, { x: 1.3, y: 3.7, w: 6.4, h: 3.2, fontSize: 11, color: C.text, fontFace: "Segoe UI", lineSpacingMultiple: 1.4, valign: "top" });

  // Right side: images gallery
  const orgImages = (org.images || []).filter(img => {
    const src = typeof img === "string" ? img : (img && img.type !== "video" && img.src ? img.src : null);
    return src && imgPath(src);
  });

  if (orgImages.length > 0) {
    const mainSrc = typeof orgImages[0] === "string" ? orgImages[0] : orgImages[0].src;
    const mainImg = imgPath(mainSrc);
    if (mainImg) {
      slide.addShape(prs.ShapeType.roundRect, { x: 8.3, y: 1.3, w: 4.5, h: 3.2, fill: { color: C.card }, rectRadius: 0.12 });
      slide.addImage({ path: mainImg, x: 8.4, y: 1.4, w: 4.3, h: 3, rounding: true });
    }

    const thumbs = orgImages.slice(1, 4);
    const thumbW = 1.35;
    const thumbGap = 0.1;
    thumbs.forEach((img, ti) => {
      const src = typeof img === "string" ? img : img.src;
      const tImg = imgPath(src);
      if (tImg) {
        const tx = 8.3 + ti * (thumbW + thumbGap);
        slide.addShape(prs.ShapeType.roundRect, { x: tx, y: 4.7, w: thumbW, h: 1.1, fill: { color: C.card }, rectRadius: 0.08 });
        slide.addImage({ path: tImg, x: tx + 0.04, y: 4.74, w: thumbW - 0.08, h: 1.02, rounding: true });
      }
    });
  }
});

// ============ CERTIFICATIONS with images ============
const certs = skills.certificates;
const certsPerSlide = 4;
const totalCertSlides = Math.ceil(certs.length / certsPerSlide);

for (let page = 0; page < totalCertSlides; page++) {
  slide = prs.addSlide({ bkgd: C.dark });
  addDecor(slide);
  const suffix = totalCertSlides > 1 ? ` (${page + 1}/${totalCertSlides})` : "";
  addSectionBar(slide, `ACHIEVEMENTS & CERTIFICATIONS${suffix}`, "🏆");

  const start = page * certsPerSlide;
  const items = certs.slice(start, start + certsPerSlide);

  items.forEach((cert, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = 0.8 + col * 6.1;
    const yPos = 1.3 + row * 3;

    slide.addShape(prs.ShapeType.roundRect, { x: xPos, y: yPos, w: 5.7, h: 2.7, fill: { color: C.card }, rectRadius: 0.12 });

    // Certificate image
    const certImgSrc = cert.certificateImage || cert.logo;
    if (certImgSrc) {
      const cImg = imgPath(certImgSrc);
      if (cImg) {
        slide.addImage({ path: cImg, x: xPos + 0.15, y: yPos + 0.15, w: 2.2, h: 1.6, rounding: true });
      }
    }

    const textX = xPos + 2.5;
    slide.addText(cert.title, { x: textX, y: yPos + 0.15, w: 3, h: 0.9, fontSize: 11, bold: true, color: C.white, fontFace: "Segoe UI", valign: "top" });
    slide.addText(cert.issuer, { x: textX, y: yPos + 1.0, w: 3, h: 0.35, fontSize: 10, color: C.accent, fontFace: "Segoe UI" });
    slide.addText(`📅 ${cert.issueDate}`, { x: textX, y: yPos + 1.35, w: 3, h: 0.3, fontSize: 9.5, color: C.sub, fontFace: "Segoe UI" });
    if (cert.credentialId) {
      slide.addText(`ID: ${cert.credentialId}`, { x: textX, y: yPos + 1.65, w: 3, h: 0.25, fontSize: 8.5, color: C.sub, fontFace: "Segoe UI" });
    }
  });
}

// ============ PROJECTS with images ============
const projPerSlide = 2;
const totalProjSlides = Math.ceil(projects.projects.length / projPerSlide);

for (let page = 0; page < totalProjSlides; page++) {
  slide = prs.addSlide({ bkgd: C.dark });
  addDecor(slide);
  const suffix = totalProjSlides > 1 ? ` (${page + 1}/${totalProjSlides})` : "";
  addSectionBar(slide, `PROJECTS${suffix}`, "💻");

  const start = page * projPerSlide;
  const items = projects.projects.slice(start, start + projPerSlide);
  const colors = [C.accent, C.green, C.orange, C.pink, C.cyan, C.accent2];

  items.forEach((proj, i) => {
    const yPos = 1.3 + i * 3.05;
    const projColor = colors[(page * projPerSlide + i) % colors.length];

    slide.addShape(prs.ShapeType.roundRect, { x: 0.8, y: yPos, w: 11.7, h: 2.8, fill: { color: C.card }, rectRadius: 0.12 });
    slide.addShape(prs.ShapeType.roundRect, { x: 0.8, y: yPos, w: 11.7, h: 0.07, fill: { color: projColor }, rectRadius: 0 });

    // Project image on left
    if (proj.image) {
      const pImg = imgPath(proj.image);
      if (pImg) {
        slide.addImage({ path: pImg, x: 1.0, y: yPos + 0.25, w: 3.5, h: 2.3, rounding: true });
      }
    }

    // Text on right
    const textX = 4.8;
    slide.addText(proj.title, { x: textX, y: yPos + 0.15, w: 7.2, h: 0.45, fontSize: 16, bold: true, color: C.white, fontFace: "Segoe UI" });

    const bodyClean = proj.bodyText.replace(/\*\*/g, "").replace(/\\n/g, "\n").replace(/^ *- */gm, "• ").trim();
    const bodyLines = bodyClean.split("\n").slice(0, 4).join("\n");
    slide.addText(bodyLines, { x: textX, y: yPos + 0.6, w: 7.2, h: 1.3, fontSize: 10, color: C.text, fontFace: "Segoe UI", lineSpacingMultiple: 1.25, valign: "top" });

    // Tags
    const tagsText = proj.tags.join("  •  ");
    slide.addText(tagsText, { x: textX, y: yPos + 1.95, w: 7.2, h: 0.3, fontSize: 9, color: projColor, fontFace: "Segoe UI", bold: true });

    // Links
    if (proj.links && proj.links.length > 0) {
      const linkText = proj.links.map(l => `🔗 ${l.text}: ${l.href}`).join("     ");
      slide.addText(linkText, { x: textX, y: yPos + 2.25, w: 7.2, h: 0.3, fontSize: 8.5, color: C.sub, fontFace: "Segoe UI" });
    }
  });
}

// ============ SLIDE: CONTACT / THANK YOU ============
slide = prs.addSlide({ bkgd: C.dark });
addDecor(slide);

// Profile photo again
if (profileImg) {
  slide.addShape(prs.ShapeType.ellipse, { x: 5.65, y: 0.5, w: 2, h: 2, fill: { color: C.card } });
  slide.addImage({ path: profileImg, x: 5.75, y: 0.6, w: 1.8, h: 1.8, rounding: true });
}

slide.addShape(prs.ShapeType.rect, { x: 4, y: 2.75, w: 5.33, h: 0.04, fill: { color: C.accent } });
slide.addText("THANK YOU", { x: 0, y: 2.9, w: 13.33, h: 1, align: "center", fontSize: 44, bold: true, color: C.white, fontFace: "Segoe UI" });
slide.addText("Let's Connect!", { x: 0, y: 3.8, w: 13.33, h: 0.5, align: "center", fontSize: 18, color: C.sub, fontFace: "Segoe UI" });

const contactRow = [
  `📧 ${about.contact.email}`,
  `📱 ${about.contact.phone}`,
  `🔗 linkedin.com/in/rigel-donovan`,
  `💻 github.com/rigel-sayudha`,
  `🌐 portfolio-rigel.vercel.app`,
];
slide.addText(contactRow.join("\n"), { x: 3, y: 4.5, w: 7.33, h: 2.2, align: "center", fontSize: 13, color: C.text, fontFace: "Segoe UI", lineSpacingMultiple: 1.7 });
slide.addText(about.contact.address, { x: 2, y: 6.5, w: 9.33, h: 0.5, align: "center", fontSize: 11, color: C.sub, fontFace: "Segoe UI" });

// Save
const outputPath = path.join(__dirname, "Portfolio_Rigel_Donovan_v2.pptx");
prs.writeFile({ fileName: outputPath })
  .then(() => console.log(`✅ PPT berhasil dibuat: ${outputPath}`))
  .catch(err => console.error("❌ Error:", err));
