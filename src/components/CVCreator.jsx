import { useState, useEffect } from "react";
import { sampleData } from "../data/sampleData";
import EditorHeader from "./editor/EditorHeader";
import LivePreview from "./editor/LivePreview";

// Importar formularios individuales
import PersonalForm from "./editor/forms/PersonalForm";
import ExperienceForm from "./editor/forms/ExperienceForm";
import EducationForm from "./editor/forms/EducationForm";
import SkillsForm from "./editor/forms/SkillsForm";
import ProjectsForm from "./editor/forms/ProjectsForm";
import CertificationsForm from "./editor/forms/CertificationsForm";
import LanguagesForm from "./editor/forms/LanguagesForm";
import CustomForm from "./editor/forms/CustomForm";

import {
  User,
  Briefcase,
  GraduationCap,
  Brain,
  FolderGit,
  Award,
  Languages,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function CVCreator({ initialTemplate, onBackToLanding }) {
  // --- ESTADO GLOBAL ---
  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem("cv_creator_draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (initialTemplate) parsed.settings.template = initialTemplate;
        return parsed;
      } catch (e) {
        console.error("Error al cargar borrador previo:", e);
      }
    }
    const data = JSON.parse(JSON.stringify(sampleData));
    if (initialTemplate) data.settings.template = initialTemplate;
    return data;
  });

  const [activeTab, setActiveTab] = useState("personal");
  const [zoomPercent, setZoomPercent] = useState(85);
  const [toast, setToast] = useState({
    message: "",
    isError: false,
    show: false,
  });

  // --- AUTO-GUARDADO ---
  useEffect(() => {
    localStorage.setItem("cv_creator_draft", JSON.stringify(cvData));
  }, [cvData]);

  // --- ACCIONES DE NOTIFICACIÓN (TOAST) ---
  const showToast = (message, isError = false) => {
    setToast({ message, isError, show: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // --- MANEJADORES DE CONFIGURACIÓN GLOBAL ---
  const handleSettingsChange = (key, value) => {
    setCvData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value,
      },
    }));
  };

  // --- ACCIONES GENERALES ---
  const handleSaveDraft = () => {
    localStorage.setItem("cv_creator_draft", JSON.stringify(cvData));
    showToast("¡Borrador guardado con éxito!");
  };

  const handleClearData = () => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas limpiar toda la información ingresada?",
      )
    ) {
      setCvData({
        personal: {
          name: "",
          title: "",
          email: "",
          phone: "",
          location: "",
          website: "",
          linkedin: "",
          github: "",
          photo: "",
          summary: "",
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: [],
        custom: { title: "Otros Datos / Intereses", items: [] },
        settings: {
          template: initialTemplate || "harvard",
          font: "font-default",
          accentColor: "#0f766e",
          spacing: "space-normal",
        },
      });
      showToast("Datos borrados");
    }
  };

  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `CV_${cvData.personal.name.replace(/\s+/g, "_") || "Curriculum"}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Estructura JSON descargada");
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        try {
          const imported = JSON.parse(evt.target.result);
          if (imported.personal && Array.isArray(imported.experience)) {
            setCvData(imported);
            showToast("Currículum importado correctamente");
          } else {
            showToast("Error: Formato de archivo JSON no válido", true);
          }
        } catch {
          showToast("Error al decodificar el archivo JSON", true);
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePrint = async () => {
    const element = document.getElementById("cv-preview");
    if (!element) return;

    const html2pdf = (await import("html2pdf.js")).default;
    const fileName = `CV_${(cvData.personal.name || "Curriculum").replace(/\s+/g, "_")}.pdf`;

    const options = {
      margin: 0,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    showToast("Generando PDF…");
    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        showToast("¡PDF descargado!");
      })
      .catch(() => {
        showToast("Error al generar el PDF", true);
      });
  };

  // --- MANEJADORES DATOS PERSONALES ---
  const handlePersonalChange = (field, val) => {
    setCvData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: val,
      },
    }));
  };

  // --- MANEJADORES DE SECCIONES DINÁMICAS ---
  const handleAddItem = (section) => {
    const newItem = { id: `${section}-${Date.now()}` };
    if (section === "experience") {
      newItem.company = "";
      newItem.role = "";
      newItem.location = "";
      newItem.start = "";
      newItem.end = "";
      newItem.desc = "";
    } else if (section === "education") {
      newItem.school = "";
      newItem.degree = "";
      newItem.field = "";
      newItem.location = "";
      newItem.start = "";
      newItem.end = "";
      newItem.desc = "";
    } else if (section === "skills") {
      newItem.name = "";
      newItem.level = "3";
      newItem.category = "";
    } else if (section === "projects") {
      newItem.name = "";
      newItem.role = "";
      newItem.link = "";
      newItem.stack = "";
      newItem.desc = "";
    } else if (section === "certifications") {
      newItem.title = "";
      newItem.issuer = "";
      newItem.date = "";
      newItem.link = "";
    } else if (section === "languages") {
      newItem.name = "";
      newItem.level = "";
    } else if (section === "custom") {
      newItem.title = "";
      newItem.desc = "";
    }

    setCvData((prev) => {
      if (section === "custom") {
        return {
          ...prev,
          custom: { ...prev.custom, items: [...prev.custom.items, newItem] },
        };
      }
      return {
        ...prev,
        [section]: [...prev[section], newItem],
      };
    });
  };

  const handleDeleteItem = (section, id) => {
    setCvData((prev) => {
      if (section === "custom") {
        return {
          ...prev,
          custom: {
            ...prev.custom,
            items: prev.custom.items.filter((i) => i.id !== id),
          },
        };
      }
      return {
        ...prev,
        [section]: prev[section].filter((i) => i.id !== id),
      };
    });
  };

  const handleMoveItem = (section, index, direction) => {
    const getNewList = (list) => {
      const newList = [...list];
      const targetIndex = index + direction;
      if (targetIndex >= 0 && targetIndex < newList.length) {
        const temp = newList[index];
        newList[index] = newList[targetIndex];
        newList[targetIndex] = temp;
      }
      return newList;
    };

    setCvData((prev) => {
      if (section === "custom") {
        return {
          ...prev,
          custom: { ...prev.custom, items: getNewList(prev.custom.items) },
        };
      }
      return {
        ...prev,
        [section]: getNewList(prev[section]),
      };
    });
  };

  const handleUpdateItemValue = (section, id, field, val) => {
    setCvData((prev) => {
      if (section === "custom") {
        return {
          ...prev,
          custom: {
            ...prev.custom,
            items: prev.custom.items.map((i) =>
              i.id === id ? { ...i, [field]: val } : i,
            ),
          },
        };
      }
      return {
        ...prev,
        [section]: prev[section].map((i) =>
          i.id === id ? { ...i, [field]: val } : i,
        ),
      };
    });
  };

  const handleCustomTitleChange = (val) => {
    setCvData((prev) => ({
      ...prev,
      custom: {
        ...prev.custom,
        title: val,
      },
    }));
  };

  // --- HELPER: Verificar si una sección tiene contenido ---
  const hasData = (section) => {
    if (section === "personal") {
      return !!(
        cvData.personal.name ||
        cvData.personal.email ||
        cvData.personal.summary
      );
    }
    if (section === "custom") {
      return cvData.custom?.items?.length > 0;
    }
    return cvData[section]?.length > 0;
  };

  // --- DEFINICIÓN DE PESTAÑAS ---
  const tabs = [
    { id: "personal", label: "Personal", icon: User },
    { id: "experience", label: "Experiencia", icon: Briefcase },
    { id: "education", label: "Educación", icon: GraduationCap },
    { id: "skills", label: "Habilidades", icon: Brain },
    { id: "projects", label: "Proyectos", icon: FolderGit },
    { id: "certifications", label: "Certificaciones", icon: Award },
    { id: "languages", label: "Idiomas", icon: Languages },
    { id: "custom", label: "Personalizada", icon: FileText },
  ];

  // --- ETIQUETAS DE NAVEGACIÓN ---
  const nextLabels = {
    personal: "Experiencia",
    experience: "Educación",
    education: "Habilidades",
    skills: "Proyectos",
    projects: "Certificaciones",
    certifications: "Idiomas",
    languages: "Personalizada",
    custom: null,
  };

  // --- RENDERIZADO DEL FORMULARIO ACTIVO ---
  const renderActiveForm = () => {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalForm
            cvData={cvData}
            onPersonalChange={handlePersonalChange}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            cvData={cvData}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onMoveItem={handleMoveItem}
            onUpdateValue={handleUpdateItemValue}
          />
        );
      case "education":
        return (
          <EducationForm
            cvData={cvData}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onMoveItem={handleMoveItem}
            onUpdateValue={handleUpdateItemValue}
          />
        );
      case "skills":
        return (
          <SkillsForm
            cvData={cvData}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onMoveItem={handleMoveItem}
            onUpdateValue={handleUpdateItemValue}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            cvData={cvData}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onMoveItem={handleMoveItem}
            onUpdateValue={handleUpdateItemValue}
          />
        );
      case "certifications":
        return (
          <CertificationsForm
            cvData={cvData}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onMoveItem={handleMoveItem}
            onUpdateValue={handleUpdateItemValue}
          />
        );
      case "languages":
        return (
          <LanguagesForm
            cvData={cvData}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onMoveItem={handleMoveItem}
            onUpdateValue={handleUpdateItemValue}
          />
        );
      case "custom":
        return (
          <CustomForm
            cvData={cvData}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onMoveItem={handleMoveItem}
            onUpdateValue={handleUpdateItemValue}
            onCustomTitleChange={handleCustomTitleChange}
          />
        );
      default:
        return (
          <PersonalForm
            cvData={cvData}
            onPersonalChange={handlePersonalChange}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* CABECERA (Toolbar) */}
      <EditorHeader
        cvData={cvData}
        onBackToLanding={onBackToLanding}
        onSettingsChange={handleSettingsChange}
        onSaveDraft={handleSaveDraft}
        onClearData={handleClearData}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onPrint={handlePrint}
      />

      {/* CUERPO CENTRAL: 2 paneles */}
      <div className="app-body">
        {/* Panel del Editor */}
        <div className="editor-panel">
          {/* Pestañas horizontales de pasos */}
          <div
            className="editor-tabs"
            role="tablist"
            aria-label="Secciones del CV"
          >
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              const completed = hasData(tab.id);
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`editor-tab ${isActive ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <TabIcon size={16} className="editor-tab-icon" />
                  <span>{tab.label}</span>
                  {completed && (
                    <CheckCircle2 size={14} className="tab-check" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Área del formulario */}
          <div className="editor-form-area">{renderActiveForm()}</div>

          {/* Pie del formulario */}
          <div className="editor-form-footer">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleSaveDraft}
            >
              Guardar Borrador
            </button>
            {nextLabels[activeTab] && (
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  const tabIds = tabs.map((t) => t.id);
                  const nextIndex = tabIds.indexOf(activeTab) + 1;
                  if (nextIndex < tabIds.length)
                    setActiveTab(tabIds[nextIndex]);
                }}
              >
                Continuar a {nextLabels[activeTab]}
              </button>
            )}
          </div>
        </div>

        {/* Panel de Previsualización */}
        <LivePreview
          cvData={cvData}
          zoomPercent={zoomPercent}
          setZoomPercent={setZoomPercent}
        />
      </div>

      {/* Toast de Notificaciones */}
      <div
        id="app-toast"
        className={toast.show ? "show" : ""}
        style={{
          backgroundColor: toast.isError ? "var(--danger)" : "var(--success)",
        }}
      >
        {toast.message}
      </div>
    </div>
  );
}
