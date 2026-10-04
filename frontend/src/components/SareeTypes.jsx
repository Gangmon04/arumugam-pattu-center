export default function SareeTypes() {
  const sareeTypes = [
    { img: 'kanchi.png', title: 'Pure Kanchipuram Silk Sarees' },
    { img: 'bridal.png', title: 'Bridal Pattu Sarees' },
    { img: 'antique.png', title: 'Antique Zari Sarees' },
    { img: 'temple.png', title: 'Temple Border Sarees' },
    { img: 'designer.png', title: 'Designer Silk Sarees' },
    { img: 'damaged.png', title: 'Old / Damaged Silk Sarees' }
  ];

  return (
    <section className="saree-types-section" id="saree-types">
      <div className="section-title-wrapper">
        <h2 className="panel-title">SAREE TYPES WE BUY</h2>
        <div className="title-ornament"></div>
      </div>
      <div className="saree-grid">
        {sareeTypes.map((saree, idx) => (
          <div className="saree-card" key={idx}>
            <img src={`/assets/images/${saree.img}`} alt={saree.title} className="saree-card-img" />
            <div className="saree-card-banner">{saree.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
