export async function generateConsultationNotes(symptoms: string) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral",
      prompt: `En français, génère une fiche médicale structurée au format JSON avec les champs :
      {
        "diagnostic": "...",
        "observations": "...",
        "recommandation": "..."
      }
      Symptômes : ${symptoms}`,

      //prompt: `Rédige en français une fiche de consultation médicale professionnelle pour un patient présentant les symptômes suivants : ${symptoms}. Inclue un diagnostic, des observations et une recommandation.`,
      stream: false,
    }),
  });

  const data = await res.json();

  try {
    const raw = data.response.trim();
  
    // Nettoie les balises Markdown ``` et les sauts de ligne autour
    const clean = raw
      .replace(/^```(?:json)?\s*/i, "") // supprime ``` ou ```json en début
      .replace(/```$/, "") // supprime ``` en fin
      .trim();
  
    const parsed = JSON.parse(clean);
    return parsed;
  } catch (e) {
    console.error("❌ JSON invalide :", data.response);
    throw new Error("Réponse IA non structurée.");
  }
}
