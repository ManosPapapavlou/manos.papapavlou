document.getElementById("calculateButton").addEventListener("click", async function () {
    const fc = parseFloat(document.getElementById("fc").value);
    const fs = parseFloat(document.getElementById("fs").value);
    const gc = parseFloat(document.getElementById("gc").value);
    const gs = parseFloat(document.getElementById("gs").value);
    const b = parseFloat(document.getElementById("b").value);
    const h = parseFloat(document.getElementById("h").value);
    const c = parseFloat(document.getElementById("c").value);
    const ar_sid = parseFloat(document.getElementById("ar_sid").value);
    const ar_sid2 = parseFloat(document.getElementById("ar_sid2").value);
    let sid = parseFloat(document.getElementById("sid").value);
    let sid2 = parseFloat(document.getElementById("sid2").value);
    const synd = parseFloat(document.getElementById("synd").value);

    // Convert values to appropriate units
    sid = sid / 10;
    sid2 = sid2 / 10;
    const d = h - (sid / 2000) - (synd / 1000) - c;
    const fcd = 0.85 * fc / gc;
    const fyd = fs / gs;
    const As = (ar_sid * Math.PI * (sid * sid) / 4) + (ar_sid2 * Math.PI * (sid2 * sid2) / 4);
    const x = As * (fyd / 10) / (0.8 * b * fcd * 1000);
    const z = d - (0.4 * x);
    const Mrd = As * fyd * z / 10;

    // Display the result
    const resultLabel = document.getElementById("resultLabel");
    resultLabel.textContent = "Result: " + Mrd.toFixed(2) + " KNm";

    // Create a new PDF document
    const { PDFDocument, rgb } = PDFLib;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 200]);

    // Add the result to the PDF
    page.drawText("Result: " + Mrd.toFixed(2) + " KNm", {
        x: 50,
        y: 150,
        size: 18,
        color: rgb(0, 0, 0),
    });

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a blob from the PDF bytes
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create a download link for the PDF
    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = "result.pdf";
    downloadLink.click();
});
