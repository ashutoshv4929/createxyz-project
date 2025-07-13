"use client";
import React from "react";

// --- यही लाइन ठीक की गई है ---
import { useUpload } from "./utilities/runtime-helpers";

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
      script.onerror =
