function SkillList() {
  const skills = ['HTML & CSS', 'JavaScript Modern', 'React JS', 'Node.js'];

  return (
    <div className="skill-card">
      <h3>Daftar Materi Keahlian</h3>
      <ul>
        {skills.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SkillList;