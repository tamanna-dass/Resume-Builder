import React, { useState, useEffect } from 'react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import AnalyticsPanel from '../components/AnalyticsPanel';
import html2pdf from 'html2pdf.js';

// Feature Toggles
const features = {
  download: true,
  email: true,
  whatsapp: false,
};

const initialData = {
  profile: {
    fullName: '',
    email: '',
    phone: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
};

const MOCK_API = {
  getResume: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const saved = localStorage.getItem('mockResumeData');
        const id = localStorage.getItem('mockResumeId') || `RES-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        localStorage.setItem('mockResumeId', id);

        resolve({
          id,
          data: saved ? JSON.parse(saved) : initialData,
        });
      }, 500);
    });
  },
  saveResume: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('mockResumeData', JSON.stringify(data));
        resolve({ success: true });
      }, 500);
    });
  }
};

function Builder() {
  const [data, setData] = useState(initialData);
  const [resumeId, setResumeId] = useState('');
  const [loading, setLoading] = useState(true);

  // Load data initially
  useEffect(() => {
    MOCK_API.getResume().then((response) => {
      setData(response.data);
      setResumeId(response.id);
      setLoading(false);
    });
  }, []);

  const handleChange = (section, field, value, index = null) => {
    // Update last edited indicator
    const now = new Date();
    const formattedDate = now.toLocaleString();
    const indicator = document.getElementById('last-edited');
    if (indicator) {
      indicator.innerText = `Last Edited: ${formattedDate}`;
    }

    setData((prev) => {
      if (index !== null) {
        // Handle array updates (education, experience)
        const newArray = [...prev[section]];
        if (typeof newArray[index] === 'object') {
          newArray[index] = { ...newArray[index], [field]: value };
        } else {
          // string array like skills
          newArray[index] = value;
        }
        return { ...prev, [section]: newArray };
      }

      // Handle simple nested object updates (profile)
      if (section === 'profile') {
        return {
          ...prev,
          profile: {
            ...prev.profile,
            [field]: value
          }
        };
      }
      return prev;
    });
  };

  const handleArrayAdd = (section, newItem) => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const handleArrayRemove = (section, index) => {
    setData((prev) => {
      const newArray = [...prev[section]];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  const handleManualSave = () => {
    MOCK_API.saveResume(data).then(() => {
      alert(`Resume ${resumeId} saved successfully!`);
    });
  };

  const downloadPDF = () => {
    // Basic html2pdf usage
    const element = document.getElementById('resume-pdf-container');
    const pwd = `${data.profile.fullName || 'User'}-${new Date().getFullYear()}`; 
    // Fake password string to print out
    alert(`Generating PDF with fake password protection: "${pwd}"`);

    const opt = {
      margin:       0,
      filename:     `resume-${resumeId}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const sendEmail = () => {
    console.log(`Sending resume ${resumeId} to ${data.profile.email || 'unknown'}... Email sent!`);
    alert("Simulated Email Sent! Check console.");
  };

  const shareWhatsapp = () => {
    alert("Simulating WhatsApp share...");
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading application...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      
      <AnalyticsPanel
        data={data}
        resumeId={resumeId}
        features={features}
        onSave={handleManualSave}
        onDownload={downloadPDF}
        onEmail={sendEmail}
        onWhatsapp={shareWhatsapp}
      />

      <div className="builder-layout">
        <div className="form-section">
          <ResumeForm
            data={data}
            onChange={handleChange}
            onArrayAdd={handleArrayAdd}
            onArrayRemove={handleArrayRemove}
          />
        </div>
        <div className="preview-section">
          <ResumePreview data={data} />
        </div>
      </div>
    </div>
  );
}

export default Builder;
