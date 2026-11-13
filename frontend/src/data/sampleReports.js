/**
 * Realistic medical laboratory sample data for ReportSaathi demo.
 * Based on standard clinical reference ranges for educational purposes.
 */

export const SAMPLE_REPORTS = {
  cbc: {
    id: "rep-cbc-001",
    title: "Complete Blood Count (CBC) with Differential",
    patientName: "Alex Morgan",
    ageGender: "38 Yrs / Female",
    sampleDate: "12 Nov 2026",
    laboratory: "MetroHealth Diagnostics",
    overallStatus: "attention_needed", // normal | attention_needed | consult_promptly
    statusHeadline: "Mild Anemia Pattern Detected",
    statusDescription: "Most immune and clotting counts are completely normal, but your red blood cell markers indicate mild iron-deficiency anemia.",
    summary: `Your blood test shows that your immune system (White Blood Cells) and blood clotting system (Platelets) are functioning very well. 

However, your Hemoglobin (11.0 g/dL) and Hematocrit (33.8%) are slightly below typical reference levels. Red blood cells use hemoglobin to carry oxygen to your muscles and brain. When these levels are slightly low, it is common to feel more easily fatigued or short of breath during exercise. This is very frequently associated with low iron intake, heavy menstrual cycles, or absorption factors.`,
    keyFindings: [
      "Hemoglobin is mildly low at 11.0 g/dL (normal range: 12.0 - 15.5 g/dL).",
      "Mean Corpuscular Volume (MCV) is 77.0 fL, showing slightly smaller red cells (microcytosis).",
      "Total White Blood Cell count (7,200 /µL) is normal — no signs of active infection.",
      "Platelet count (240,000 /µL) is optimal for healthy clotting."
    ],
    categories: [
      {
        name: "Red Blood Cells & Oxygen Delivery",
        description: "These markers evaluate how effectively your blood transports oxygen from your lungs to the rest of your body.",
        tests: [
          {
            name: "Hemoglobin (Hb)",
            value: "11.0",
            unit: "g/dL",
            referenceRange: "12.0 - 15.5",
            status: "low",
            whatItIs: "The iron-rich protein inside red blood cells that binds oxygen.",
            whatItMeans: "A mildly lower count means less oxygen delivery to your tissues, which can cause tiredness or sluggishness."
          },
          {
            name: "Hematocrit (PCV)",
            value: "33.8",
            unit: "%",
            referenceRange: "36.0 - 46.0",
            status: "low",
            whatItIs: "The percentage of your total blood volume that consists of red blood cells.",
            whatItMeans: "Reflects the hemoglobin level; slightly lower than standard baseline."
          },
          {
            name: "RBC Count",
            value: "3.9",
            unit: "mil/µL",
            referenceRange: "4.0 - 5.2",
            status: "low",
            whatItIs: "The absolute number of red cells circulating in your bloodstream.",
            whatItMeans: "Slightly below average; consistent with mild nutritional or iron anemia."
          },
          {
            name: "MCV (Mean Corpuscular Volume)",
            value: "77.0",
            unit: "fL",
            referenceRange: "80.0 - 100.0",
            status: "low",
            whatItIs: "The average physical size of your red blood cells.",
            whatItMeans: "Smaller red cells (microcytic) typically point toward iron deficiency or minor hemoglobin variations."
          },
          {
            name: "MCH (Mean Corpuscular Hb)",
            value: "25.2",
            unit: "pg",
            referenceRange: "27.0 - 33.0",
            status: "low",
            whatItIs: "The amount of hemoglobin inside an average red cell.",
            whatItMeans: "Slightly pale red cells (hypochromia), matching the low iron pattern."
          }
        ]
      },
      {
        name: "White Blood Cells & Immune Defense",
        description: "These cells defend your body against bacterial, viral, and fungal infections.",
        tests: [
          {
            name: "Total WBC Count",
            value: "7,200",
            unit: "/µL",
            referenceRange: "4,500 - 11,000",
            status: "normal",
            whatItIs: "Total count of immune defense cells in circulation.",
            whatItMeans: "Right in the healthy middle; no indication of acute infection or inflammation."
          },
          {
            name: "Neutrophils",
            value: "60",
            unit: "%",
            referenceRange: "40 - 70",
            status: "normal",
            whatItIs: "First-responder immune cells that fight bacterial invaders.",
            whatItMeans: "Normal balance."
          },
          {
            name: "Lymphocytes",
            value: "31",
            unit: "%",
            referenceRange: "20 - 45",
            status: "normal",
            whatItIs: "Specialized cells responsible for viral immunity and antibodies.",
            whatItMeans: "Normal immune memory balance."
          },
          {
            name: "Monocytes",
            value: "6",
            unit: "%",
            referenceRange: "2 - 8",
            status: "normal",
            whatItIs: "Scavenger cells that clean up cellular debris after an immune response.",
            whatItMeans: "Healthy normal range."
          }
        ]
      },
      {
        name: "Platelets & Blood Clotting",
        description: "Platelets are microscopic cell fragments that form clots to stop bleeding.",
        tests: [
          {
            name: "Platelet Count",
            value: "240,000",
            unit: "/µL",
            referenceRange: "150,000 - 450,000",
            status: "normal",
            whatItIs: "Clotting factor cell count.",
            whatItMeans: "Normal clotting ability. No heightened risk of unexplained bruising or bleeding."
          }
        ]
      }
    ],
    doctorQuestions: [
      "Could my low hemoglobin (11.0 g/dL) explain my recent fatigue?",
      "Would you recommend checking my serum ferritin (iron storage) or vitamin B12 levels?",
      "Are there dietary iron adjustments or gentle supplements you'd recommend?",
      "When would you like me to repeat this CBC test to monitor progress?"
    ]
  },

  lipid: {
    id: "rep-lipid-002",
    title: "Comprehensive Lipid & Cardiovascular Panel",
    patientName: "David Chen",
    ageGender: "49 Yrs / Male",
    sampleDate: "08 Nov 2026",
    laboratory: "Apex Health Laboratories",
    overallStatus: "attention_needed",
    statusHeadline: "Elevated LDL & Triglycerides",
    statusDescription: "Your 'bad' cholesterol (LDL) and triglycerides are above recommended thresholds, while HDL ('good') cholesterol is slightly low.",
    summary: `Your lipid profile assesses the circulating fats and cholesterol particles in your blood that influence cardiovascular wellness.

Your Total Cholesterol (234 mg/dL) and LDL Cholesterol (152 mg/dL) are both above the optimal cutoff of 100 mg/dL. Elevated LDL particles can gradually contribute to plaque accumulation in artery walls over time. Additionally, your Triglycerides (188 mg/dL) are mildly elevated, which is often responsive to reducing refined carbohydrates and sugars. 

The positive news is that lipid levels are often highly responsive to lifestyle adjustments, nutrition, and guidance from your physician.`,
    keyFindings: [
      "LDL ('Bad') Cholesterol is elevated at 152 mg/dL (optimal is < 100 mg/dL).",
      "Total Cholesterol is 234 mg/dL (desirable is < 200 mg/dL).",
      "Triglycerides are mildly elevated at 188 mg/dL (normal is < 150 mg/dL).",
      "HDL ('Good') Cholesterol is slightly below recommended levels at 42 mg/dL (target > 50 mg/dL)."
    ],
    categories: [
      {
        name: "Cholesterol Particles",
        description: "Essential fatty molecules used to build cell membranes and hormones.",
        tests: [
          {
            name: "Total Cholesterol",
            value: "234",
            unit: "mg/dL",
            referenceRange: "< 200",
            status: "high",
            whatItIs: "The combined total amount of cholesterol circulating in your blood.",
            whatItMeans: "Above target. Important to review alongside LDL and HDL ratios."
          },
          {
            name: "LDL Cholesterol (Direct)",
            value: "152",
            unit: "mg/dL",
            referenceRange: "< 100",
            status: "high",
            whatItIs: "Often called 'bad' cholesterol; delivers fats to blood vessel walls.",
            whatItMeans: "Elevated levels can increase long-term arterial plaque risk if unmanaged."
          },
          {
            name: "HDL Cholesterol",
            value: "42",
            unit: "mg/dL",
            referenceRange: "> 50",
            status: "low",
            whatItIs: "Often called 'good' cholesterol; sweeps excess fats back to the liver for disposal.",
            whatItMeans: "A bit lower than ideal. Regular aerobic exercise and healthy fats (olive oil, nuts) can help raise it."
          },
          {
            name: "Non-HDL Cholesterol",
            value: "192",
            unit: "mg/dL",
            referenceRange: "< 130",
            status: "high",
            whatItIs: "All atherogenic (plaque-forming) cholesterol types combined.",
            whatItMeans: "Elevated, confirming the focus on cardiovascular prevention."
          }
        ]
      },
      {
        name: "Triglycerides & Ratios",
        description: "Triglycerides represent unused calories stored as fat in your bloodstream.",
        tests: [
          {
            name: "Triglycerides (Fasting)",
            value: "188",
            unit: "mg/dL",
            referenceRange: "< 150",
            status: "high",
            whatItIs: "The most common form of fat stored in your body.",
            whatItMeans: "Mildly elevated. Frequently linked to dietary sugars, refined carbs, or sedentary periods."
          },
          {
            name: "Total Chol / HDL Ratio",
            value: "5.57",
            unit: "Ratio",
            referenceRange: "< 4.5",
            status: "high",
            whatItIs: "Comparison of total cholesterol to protective HDL cholesterol.",
            whatItMeans: "Higher than recommended, driven by higher LDL and lower HDL."
          }
        ]
      }
    ],
    doctorQuestions: [
      "What is my personal 10-year cardiovascular risk score based on these numbers?",
      "Should we start with dietary/exercise changes for 3–6 months, or do you recommend medication?",
      "Are there specific dietary swaps (e.g. fiber, reducing refined sugars) you advise?",
      "Would an ApoB or coronary calcium scan (CAC) be beneficial for my age group?"
    ]
  },

  metabolic: {
    id: "rep-meta-003",
    title: "Basic Metabolic & Renal Function Panel",
    patientName: "Robert Taylor",
    ageGender: "44 Yrs / Male",
    sampleDate: "10 Nov 2026",
    laboratory: "HealthQuest PathLab",
    overallStatus: "attention_needed",
    statusHeadline: "Elevated Fasting Glucose (Pre-Diabetes Range)",
    statusDescription: "Kidney biomarkers and electrolytes are healthy, but fasting blood sugar and HbA1c suggest insulin sensitivity should be addressed.",
    summary: `Your metabolic panel checks your blood sugar regulation, kidney filtration, and electrolyte hydration balance.

Your kidney function (Creatinine: 0.95 mg/dL, BUN: 14 mg/dL) and electrolytes (Sodium, Potassium) are in excellent condition, indicating normal kidney filtration and good hydration.

However, your Fasting Blood Glucose (118 mg/dL) and estimated HbA1c (6.1%) fall into the pre-diabetes threshold (fasting glucose between 100-125 mg/dL). Pre-diabetes is an early signal that your body's cells are less sensitive to insulin. Importantly, this is the most reversible stage through nutrition, movement, and sleep habits.`,
    keyFindings: [
      "Fasting Glucose is 118 mg/dL (normal fasting is 70 - 99 mg/dL; pre-diabetes is 100 - 125 mg/dL).",
      "Glycated Hemoglobin (HbA1c) is 6.1% (pre-diabetes range: 5.7% - 6.4%).",
      "Kidney filtration (eGFR > 90 mL/min, Creatinine 0.95 mg/dL) is completely healthy.",
      "Electrolytes (Sodium, Potassium, Chloride) are in ideal physiological balance."
    ],
    categories: [
      {
        name: "Blood Sugar & Glycemic Control",
        description: "Assesses how effectively your body processes glucose for energy.",
        tests: [
          {
            name: "Fasting Blood Glucose",
            value: "118",
            unit: "mg/dL",
            referenceRange: "70 - 99",
            status: "high",
            whatItIs: "The concentration of sugar in your bloodstream after an 8–12 hour fast.",
            whatItMeans: "Falls into the pre-diabetes range (100–125 mg/dL). Cells require more insulin to clear sugar."
          },
          {
            name: "HbA1c (Glycated Hemoglobin)",
            value: "6.1",
            unit: "%",
            referenceRange: "< 5.7",
            status: "high",
            whatItIs: "Your average blood sugar level over the past 2 to 3 months.",
            whatItMeans: "In the pre-diabetes bracket (5.7%–6.4%). Strong opportunity for lifestyle reversal."
          }
        ]
      },
      {
        name: "Kidney Function & Hydration",
        description: "Measures how effectively your kidneys filter metabolic waste products.",
        tests: [
          {
            name: "Serum Creatinine",
            value: "0.95",
            unit: "mg/dL",
            referenceRange: "0.70 - 1.30",
            status: "normal",
            whatItIs: "A normal muscle breakdown byproduct cleared entirely by healthy kidneys.",
            whatItMeans: "Healthy kidney filtration rate."
          },
          {
            name: "Blood Urea Nitrogen (BUN)",
            value: "14",
            unit: "mg/dL",
            referenceRange: "7 - 20",
            status: "normal",
            whatItIs: "A liver waste product cleared by kidneys.",
            whatItMeans: "Normal filtration and adequate hydration."
          },
          {
            name: "eGFR (Estimated Glomerular Filtration)",
            value: "> 90",
            unit: "mL/min/1.73m²",
            referenceRange: "> 60",
            status: "normal",
            whatItIs: "The overall filtration efficiency index of your kidneys.",
            whatItMeans: "Full, healthy kidney function."
          }
        ]
      },
      {
        name: "Electrolytes & Fluid Balance",
        description: "Vital minerals that maintain fluid balance, nerve signals, and heart rhythm.",
        tests: [
          {
            name: "Sodium (Na+)",
            value: "140",
            unit: "mEq/L",
            referenceRange: "135 - 145",
            status: "normal",
            whatItIs: "Key electrolyte regulating blood pressure and fluid levels.",
            whatItMeans: "Optimal fluid balance."
          },
          {
            name: "Potassium (K+)",
            value: "4.4",
            unit: "mEq/L",
            referenceRange: "3.5 - 5.1",
            status: "normal",
            whatItIs: "Critical mineral for proper heartbeat and muscle contraction.",
            whatItMeans: "Healthy cellular electrical stability."
          }
        ]
      }
    ],
    doctorQuestions: [
      "Does my fasting glucose of 118 mg/dL indicate pre-diabetes?",
      "Would a 2-hour oral glucose tolerance test or continuous glucose monitor (CGM) give more context?",
      "What lifestyle or dietary modifications have the strongest evidence for reversing this early elevation?",
      "When should we recheck my fasting glucose and HbA1c?"
    ]
  }
};
