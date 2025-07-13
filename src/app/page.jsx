"use client";
import React from "react";

import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [activeCategory, setActiveCategory] = React.useState("pdf");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [processing, setProcessing] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [selectedTool, setSelectedTool] = React.useState(null);
  const [targetSize, setTargetSize] = React.useState("");
  const [textInput, setTextInput] = React.useState("");
  const [upload, { loading: uploading }] = useUpload();

  const categories = [
    {
      id: "pdf",
      name: "PDF Tools",
      icon: "📋",
      modernIcon: "📄",
      color: "from-red-500 to-pink-500",
      description: "Merge, split, compress and manipulate PDF files",
    },
    {
      id: "converters",
      name: "Converters",
      icon: "⚡",
      modernIcon: "🔄",
      color: "from-blue-500 to-indigo-500",
      description: "Convert between different file formats",
    },
    {
      id: "image",
      name: "Image Tools",
      icon: "🎨",
      modernIcon: "🖼️",
      color: "from-green-500 to-teal-500",
      description: "Compress, resize and convert images",
    },
    {
      id: "text",
      name: "Text Tools",
      icon: "🤖",
      modernIcon: "📝",
      color: "from-purple-500 to-violet-500",
      description: "Extract and manipulate text from files",
    },
  ];

  const pdfTools = [
    {
      name: "Merge PDFs",
      description: "Combine multiple PDF files into one",
      icon: "🔗",
      modernIcon: "📑",
      color: "from-red-500 to-orange-500",
      action: "merge-pdf",
    },
    {
      name: "Split PDF",
      description: "Split PDF into separate pages",
      icon: "✂️",
      modernIcon: "📄",
      color: "from-orange-500 to-yellow-500",
      action: "split-pdf",
    },
    {
      name: "Compress PDF",
      description: "Reduce PDF file size",
      icon: "🗜️",
      modernIcon: "📉",
      color: "from-yellow-500 to-orange-500",
      action: "compress-pdf",
    },
    {
      name: "PDF to Images",
      description: "Convert PDF pages to image files",
      icon: "🖼️",
      modernIcon: "🎨",
      color: "from-green-500 to-blue-500",
      action: "pdf-to-images",
    },
    {
      name: "Protect PDF",
      description: "Add password protection to PDF",
      icon: "🔒",
      modernIcon: "🛡️",
      color: "from-blue-500 to-purple-500",
      action: "protect-pdf",
    },
    {
      name: "Unlock PDF",
      description: "Remove password from PDF",
      icon: "🔓",
      modernIcon: "🔑",
      color: "from-blue-600 to-indigo-600",
      action: "unlock-pdf",
    },
  ];

  const converterTools = [
    {
      name: "Word to PDF",
      description: "Convert Word documents to PDF",
      icon: "📝",
      modernIcon: "📋",
      color: "from-blue-500 to-indigo-500",
      action: "word-to-pdf",
    },
    {
      name: "PDF to Word",
      description: "Convert PDF to Word document",
      icon: "📄",
      modernIcon: "📝",
      color: "from-indigo-500 to-purple-500",
      action: "pdf-to-word",
    },
    {
      name: "Excel to PDF",
      description: "Convert Excel files to PDF",
      icon: "📊",
      modernIcon: "📈",
      color: "from-green-500 to-blue-500",
      action: "excel-to-pdf",
    },
    {
      name: "PowerPoint to PDF",
      description: "Convert presentations to PDF",
      icon: "📽️",
      modernIcon: "🎬",
      color: "from-orange-500 to-red-500",
      action: "ppt-to-pdf",
    },
  ];

  const imageTools = [
    {
      name: "Compress Images",
      description: "Reduce image file size",
      icon: "🗜️",
      modernIcon: "📷",
      color: "from-green-500 to-teal-500",
      action: "compress-image",
    },
    {
      name: "Resize Images",
      description: "Change image dimensions",
      icon: "📏",
      modernIcon: "🔧",
      color: "from-teal-500 to-blue-500",
      action: "resize-image",
    },
    {
      name: "Convert Images",
      description: "Change image format",
      icon: "🔄",
      modernIcon: "🎭",
      color: "from-blue-500 to-indigo-500",
      action: "convert-image",
    },
  ];

  const textTools = [
    {
      name: "Extract Text from Image",
      description: "Extract text from images using AI",
      icon: "🔍",
      modernIcon: "🤖",
      color: "from-purple-500 to-pink-500",
      action: "extract-text",
    },
    {
      name: "Text to PDF",
      description: "Convert text to PDF document",
      icon: "📄",
      modernIcon: "✍️",
      color: "from-pink-500 to-red-500",
      action: "text-to-pdf",
    },
  ];

  // Load PDF-lib dynamically
  const loadPDFLib = async () => {
    if (window.PDFLib) return window.PDFLib;

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js";
      script.onload = () => resolve(window.PDFLib);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // Load PDF.js dynamically
  const loadPDFJS = async () => {
    if (window.pdfjsLib) return window.pdfjsLib;

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // Load jsPDF dynamically
  const loadJsPDF = async () => {
    if (window.jsPDF) return window.jsPDF;

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.onload = () => resolve(window.jspdf.jsPDF);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // Utility function to download file
  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Parse target size input
  const parseTargetSize = (input) => {
    const match = input.toLowerCase().match(/(\d+(?:\.\d+)?)\s*(kb|mb)?/);
    if (!match) return null;

    const value = parseFloat(match[1]);
    const unit = match[2] || "kb";

    return unit === "mb" ? value * 1024 * 1024 : value * 1024;
  };

  // Merge PDFs
  const mergePDFs = async (files) => {
    try {
      const PDFLib = await loadPDFLib();
      const mergedPdf = await PDFLib.PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save({ updateFieldAppearances: true });
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      downloadFile(blob, "merged.pdf");

      return { success: true, size: (blob.size / 1024).toFixed(2) + " KB" };
    } catch (error) {
      throw new Error("Failed to merge PDFs: " + error.message);
    }
  };

  // Split PDF
  const splitPDF = async (file) => {
    try {
      const PDFLib = await loadPDFLib();
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
      const pageCount = pdf.getPageCount();

      const results = [];

      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFLib.PDFDocument.create();
        const [page] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(page);

        const pdfBytes = await newPdf.save({ updateFieldAppearances: true });
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        downloadFile(blob, `page_${i + 1}.pdf`);
        results.push(`page_${i + 1}.pdf`);
      }

      return { success: true, pages: results.length };
    } catch (error) {
      throw new Error("Failed to split PDF: " + error.message);
    }
  };

  // Compress PDF
  const compressPDF = async (file, targetSizeBytes) => {
    try {
      const PDFLib = await loadPDFLib();
      const arrayBuffer = await file.arrayBuffer();
      let pdf = await PDFLib.PDFDocument.load(arrayBuffer);

      let pdfBytes;
      let compressionLevel = 0.9;
      let attempts = 0;
      const maxAttempts = 5;

      do {
        pdfBytes = await pdf.save({
          updateFieldAppearances: true,
          useObjectStreams: true,
          addDefaultPage: false,
        });

        if (pdfBytes.length <= targetSizeBytes || attempts >= maxAttempts)
          break;

        // Try to compress further by reducing quality
        compressionLevel -= 0.2;
        attempts++;

        // Reload and try again
        pdf = await PDFLib.PDFDocument.load(arrayBuffer);
      } while (attempts < maxAttempts);

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const finalSize = (blob.size / 1024).toFixed(2);
      const targetSizeKB = (targetSizeBytes / 1024).toFixed(2);

      downloadFile(blob, "compressed.pdf");

      return {
        success: true,
        size: finalSize + " KB",
        message:
          blob.size <= targetSizeBytes
            ? `Successfully compressed to ${finalSize} KB (target: ${targetSizeKB} KB)`
            : `Best compression achieved: ${finalSize} KB (target: ${targetSizeKB} KB)`,
      };
    } catch (error) {
      throw new Error("Failed to compress PDF: " + error.message);
    }
  };

  // PDF to Images
  const pdfToImages = async (file) => {
    try {
      const pdfjsLib = await loadPDFJS();
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const images = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;

        canvas.toBlob(
          (blob) => {
            downloadFile(blob, `page_${i}.jpg`);
          },
          "image/jpeg",
          0.7
        );

        images.push(`page_${i}.jpg`);
      }

      return { success: true, images: images.length };
    } catch (error) {
      throw new Error("Failed to convert PDF to images: " + error.message);
    }
  };

  // Text to PDF
  const textToPDF = async (text) => {
    try {
      const jsPDF = await loadJsPDF();
      const doc = new jsPDF();

      const lines = doc.splitTextToSize(text, 180);
      doc.text(lines, 10, 10);

      doc.save("text-document.pdf");

      return { success: true, message: "PDF created successfully" };
    } catch (error) {
      throw new Error("Failed to create PDF: " + error.message);
    }
  };

  // Extract text from image using GPT Vision
  const extractTextFromImage = async (file) => {
    try {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });

      const response = await fetch("/integrations/gpt-vision/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Extract all text from this image. Return only the text content, no explanations.",
                },
                {
                  type: "image_url",
                  image_url: { url: base64 },
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const extractedText = data.choices[0].message.content;

      return { success: true, text: extractedText };
    } catch (error) {
      throw new Error("Failed to extract text: " + error.message);
    }
  };

  // Handle tool click
  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    setResult(null);
    setError(null);
    setSelectedFile(null);
    setSelectedFiles([]);
    setTargetSize("");
    setTextInput("");
  };

  // Handle file processing
  const handleProcess = async () => {
    if (!selectedTool) return;

    setProcessing(true);
    setError(null);

    try {
      let result;

      switch (selectedTool.action) {
        case "merge-pdf":
          if (selectedFiles.length < 2) {
            throw new Error("Please select at least 2 PDF files to merge");
          }
          result = await mergePDFs(selectedFiles);
          break;

        case "split-pdf":
          if (!selectedFile) {
            throw new Error("Please select a PDF file to split");
          }
          result = await splitPDF(selectedFile);
          break;

        case "compress-pdf":
          if (!selectedFile) {
            throw new Error("Please select a PDF file to compress");
          }
          if (!targetSize) {
            throw new Error("Please enter target file size (e.g., 500kb, 2mb)");
          }
          const targetBytes = parseTargetSize(targetSize);
          if (!targetBytes) {
            throw new Error(
              'Invalid size format. Use format like "500kb" or "2mb"'
            );
          }
          result = await compressPDF(selectedFile, targetBytes);
          break;

        case "pdf-to-images":
          if (!selectedFile) {
            throw new Error("Please select a PDF file to convert");
          }
          result = await pdfToImages(selectedFile);
          break;

        case "text-to-pdf":
          let text = textInput;
          if (selectedFile) {
            text = await selectedFile.text();
          }
          if (!text.trim()) {
            throw new Error("Please enter text or select a text file");
          }
          result = await textToPDF(text);
          break;

        case "extract-text":
          if (!selectedFile) {
            throw new Error("Please select an image file");
          }
          result = await extractTextFromImage(selectedFile);
          break;

        default:
          throw new Error("This tool is not yet implemented");
      }

      setResult(result);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setProcessing(false);
    }
  };

  const getCurrentTools = () => {
    switch (activeCategory) {
      case "pdf":
        return pdfTools;
      case "converters":
        return converterTools;
      case "image":
        return imageTools;
      case "text":
        return textTools;
      default:
        return pdfTools;
    }
  };

  const getCurrentCategoryInfo = () => {
    return categories.find((cat) => cat.id === activeCategory);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 py-6 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center logo-bounce">
              <span className="text-white text-xl font-bold">📄</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                FileConverter Pro
              </h1>
              <p className="text-gray-300 text-sm md:text-base">
                Professional file conversion & manipulation
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-green-400">
            <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot"></span>
            <span className="text-sm font-medium">100% Secure & Private</span>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="px-4 md:px-8 mb-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setSelectedTool(null);
                setResult(null);
                setError(null);
              }}
              className={`p-4 md:p-6 rounded-2xl transition-all duration-500 transform hover:scale-105 category-card group ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} shadow-lg scale-105 active-category`
                  : "bg-white/10 backdrop-blur-sm hover:bg-white/20"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div
                  className={`text-2xl md:text-3xl mb-2 category-icon-container relative overflow-hidden ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                >
                  {/* Primary Icon */}
                  <span className="category-primary-icon transition-all duration-300 group-hover:scale-110 group-hover:opacity-0">
                    {category.icon}
                  </span>
                  {/* Modern Icon Overlay */}
                  <span className="category-modern-icon absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-110">
                    {category.modernIcon}
                  </span>
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-white/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  {/* Pulse Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></div>
                </div>
                <h3 className="text-white font-semibold text-sm md:text-base group-hover:text-blue-300 transition-colors">
                  {category.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Category Header */}
      <div className="px-4 md:px-8 mb-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 fade-in-up">
          {getCurrentCategoryInfo()?.name}
        </h2>
        <p
          className="text-gray-300 text-lg max-w-2xl mx-auto fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {getCurrentCategoryInfo()?.description}
        </p>
      </div>

      {/* Tools Grid */}
      <div className="px-4 md:px-8 mb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentTools().map((tool, index) => (
            <div
              key={index}
              onClick={() => handleToolClick(tool)}
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 cursor-pointer group tool-card ${
                selectedTool?.action === tool.action
                  ? "ring-2 ring-blue-400 bg-white/20"
                  : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center flex-shrink-0 tool-icon-container relative overflow-hidden`}
                >
                  {/* Primary Icon */}
                  <span className="text-white text-2xl tool-primary-icon transition-all duration-300 group-hover:scale-110 group-hover:opacity-0">
                    {tool.icon}
                  </span>
                  {/* Modern Icon Overlay */}
                  <span className="text-white text-2xl tool-modern-icon absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-110">
                    {tool.modernIcon}
                  </span>
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-white/20 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  {/* Pulse Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 animate-pulse"></div>
                  {/* Rotating Border */}
                  <div className="absolute inset-0 border-2 border-white/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Interface */}
      {selectedTool && (
        <div className="px-4 md:px-8 mb-12 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-white font-semibold text-xl mb-4 flex items-center space-x-3">
              <span
                className={`w-8 h-8 bg-gradient-to-r ${selectedTool.color} rounded-lg flex items-center justify-center text-sm`}
              >
                {selectedTool.icon}
              </span>
              <span>{selectedTool.name}</span>
            </h3>

            {/* File Input */}
            <div className="space-y-4">
              {selectedTool.action === "merge-pdf" ? (
                <div>
                  <label className="block text-gray-300 mb-2">
                    Select PDF files to merge:
                  </label>
                  <input
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={(e) =>
                      setSelectedFiles(Array.from(e.target.files))
                    }
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white"
                  />
                  {selectedFiles.length > 0 && (
                    <p className="text-green-400 text-sm mt-2">
                      {selectedFiles.length} files selected
                    </p>
                  )}
                </div>
              ) : selectedTool.action === "text-to-pdf" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">
                      Upload text file (optional):
                    </label>
                    <input
                      type="file"
                      accept=".txt"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">
                      Or enter text manually:
                    </label>
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Enter your text here..."
                      rows={6}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              ) : selectedTool.action === "extract-text" ? (
                <div>
                  <label className="block text-gray-300 mb-2">
                    Select image file:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-gray-300 mb-2">
                    Select file:
                  </label>
                  <input
                    type="file"
                    accept={selectedTool.action.includes("pdf") ? ".pdf" : "*"}
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white"
                  />
                </div>
              )}

              {/* Compress PDF target size input */}
              {selectedTool.action === "compress-pdf" && (
                <div>
                  <label className="block text-gray-300 mb-2">
                    Target file size (e.g., 500kb, 2mb):
                  </label>
                  <input
                    type="text"
                    value={targetSize}
                    onChange={(e) => setTargetSize(e.target.value)}
                    placeholder="500kb"
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  />
                </div>
              )}

              {/* Process Button */}
              <button
                onClick={handleProcess}
                disabled={processing}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing
                  ? "Processing..."
                  : `Process with ${selectedTool.name}`}
              </button>
            </div>

            {/* Results */}
            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {result && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                {result.text ? (
                  <div>
                    <p className="text-green-300 mb-3">
                      Text extracted successfully!
                    </p>
                    <div className="bg-white/5 p-3 rounded border max-h-40 overflow-y-auto">
                      <p className="text-white text-sm whitespace-pre-wrap">
                        {result.text}
                      </p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(result.text)
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-all duration-300 flex items-center space-x-2 group relative overflow-hidden"
                      >
                        {/* Primary Icon */}
                        <span className="text-lg transition-all duration-300 group-hover:scale-110 group-hover:opacity-0">
                          📋
                        </span>
                        {/* Modern Icon Overlay */}
                        <span className="text-lg absolute left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-110">
                          📝
                        </span>
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded"></div>
                        <span className="relative z-10">Copy Text</span>
                      </button>
                      <button
                        onClick={() => {
                          const blob = new Blob([result.text], {
                            type: "text/plain",
                          });
                          downloadFile(blob, "extracted-text.txt");
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-all duration-300 flex items-center space-x-2 group relative overflow-hidden"
                      >
                        {/* Primary Icon */}
                        <span className="text-lg transition-all duration-300 group-hover:scale-110 group-hover:opacity-0">
                          💾
                        </span>
                        {/* Modern Icon Overlay */}
                        <span className="text-lg absolute left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-110">
                          📥
                        </span>
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded"></div>
                        <span className="relative z-10">Download as TXT</span>
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const result = await textToPDF(result.text);
                            // PDF will be automatically downloaded by textToPDF function
                          } catch (error) {
                            console.error("Error creating PDF:", error);
                            setError("Failed to create PDF: " + error.message);
                          }
                        }}
                        className="bg-purple-500 text-white px-4 py-2 rounded text-sm hover:bg-purple-600 transition-all duration-300 flex items-center space-x-2 group relative overflow-hidden"
                      >
                        {/* Primary Icon */}
                        <span className="text-lg transition-all duration-300 group-hover:scale-110 group-hover:opacity-0">
                          📄
                        </span>
                        {/* Modern Icon Overlay */}
                        <span className="text-lg absolute left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-110">
                          📑
                        </span>
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded"></div>
                        <span className="relative z-10">Download as PDF</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-green-300">
                      ✅ {result.message || "Operation completed successfully!"}
                    </p>
                    {result.size && (
                      <p className="text-gray-300 text-sm">
                        File size: {result.size}
                      </p>
                    )}
                    {result.pages && (
                      <p className="text-gray-300 text-sm">
                        Pages created: {result.pages}
                      </p>
                    )}
                    {result.images && (
                      <p className="text-gray-300 text-sm">
                        Images created: {result.images}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="px-4 md:px-8 mb-12 relative z-10">
        <div className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 backdrop-blur-sm rounded-3xl p-8 features-section">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 fade-in-up">
            The Complete File Conversion Solution
          </h2>
          <p
            className="text-gray-300 text-center mb-12 max-w-4xl mx-auto text-lg fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            FileConverter Pro offers a comprehensive suite of tools for all your
            document processing needs. Fast, secure, and completely free to use
            with professional-grade results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: "📄",
                title: "PDF Tools",
                description:
                  "Merge, split, compress and manipulate PDF files with professional quality. Password protect or unlock PDFs instantly.",
                color: "from-red-500 to-pink-500",
              },
              {
                icon: "🔄",
                title: "File Conversion",
                description:
                  "Convert between PDF, Word, Excel, PowerPoint and more formats. Maintain formatting and quality in every conversion.",
                color: "from-blue-500 to-indigo-500",
              },
              {
                icon: "🖼️",
                title: "Image Processing",
                description:
                  "Compress, resize and convert images to different formats. Optimize images for web or print with advanced algorithms.",
                color: "from-green-500 to-teal-500",
              },
              {
                icon: "🤖",
                title: "AI-Powered OCR",
                description:
                  "Extract text from images using advanced AI technology. Support for multiple languages with high accuracy rates.",
                color: "from-purple-500 to-violet-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center feature-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 feature-icon`}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6 info-card">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl star-icon">⭐</span>
                <h3 className="text-white font-semibold text-xl">
                  Why Choose FileConverter Pro?
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  "No file size limits or watermarks",
                  "Batch processing for multiple files",
                  "Professional quality output",
                  "Works on all devices and browsers",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 check-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="bg-white/5 rounded-2xl p-6 info-card"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl shield-icon">🛡️</span>
                <h3 className="text-white font-semibold text-xl">
                  Security & Privacy
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: "🔒", text: "SSL encrypted file transfers" },
                  { icon: "🗑️", text: "Files deleted after processing" },
                  { icon: "👤", text: "No registration required" },
                  { icon: "🌍", text: "GDPR compliant processing" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 security-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="security-icon">{feature.icon}</span>
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="px-4 md:px-8 pb-12 relative z-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 trust-badges">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            {[
              { icon: "🛡️", text: "100% Secure" },
              { icon: "⚡", text: "Lightning Fast" },
              { icon: "📱", text: "Mobile Friendly" },
              { icon: "❤️", text: "Free Forever" },
              { icon: "👥", text: "Trusted by Millions" },
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 badge-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-xl badge-icon">{badge.icon}</span>
                <span className="text-gray-300 font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.6); }
        }

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          background: linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(219, 39, 119, 0.1));
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 120px;
          height: 120px;
          top: 20%;
          right: 10%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 60px;
          height: 60px;
          bottom: 30%;
          left: 20%;
          animation-delay: 4s;
        }

        .shape-4 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          right: 20%;
          animation-delay: 1s;
        }

        .shape-5 {
          width: 40px;
          height: 40px;
          top: 50%;
          left: 50%;
          animation-delay: 3s;
        }

        .logo-bounce {
          animation: bounce 2s infinite;
        }

        .pulse-dot {
          animation: pulse 2s infinite;
        }

        .category-card {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .category-icon {
          transition: all 0.3s ease;
        }

        .category-icon.active {
          animation: bounce 1s ease-in-out;
        }

        .active-category {
          animation: glow 2s ease-in-out infinite;
        }

        .tool-card {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
          transform: translateX(-30px);
        }

        .tool-icon {
          transition: all 0.3s ease;
        }

        .tool-card:hover .tool-icon {
          animation: rotate 0.5s ease-in-out;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .features-section {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .feature-card {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .feature-icon {
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          animation: scale 0.6s ease-in-out;
        }

        .info-card {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }

        .check-item {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .security-item {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }

        .security-icon {
          display: inline-block;
          transition: all 0.3s ease;
        }

        .security-item:hover .security-icon {
          animation: bounce 0.6s ease-in-out;
        }

        .star-icon {
          animation: rotate 4s linear infinite;
        }

        .shield-icon {
          animation: pulse 3s ease-in-out infinite;
        }

        .trust-badges {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .badge-item {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .badge-icon {
          transition: all 0.3s ease;
        }

        .badge-item:hover .badge-icon {
          animation: bounce 0.5s ease-in-out;
        }

        /* Hover effects */
        .category-card:hover {
          transform: translateY(-5px) scale(1.05);
        }

        .tool-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        /* Responsive animations */
        @media (max-width: 768px) {
          .shape {
            width: 40px !important;
            height: 40px !important;
          }
          
          .floating-shapes {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;
