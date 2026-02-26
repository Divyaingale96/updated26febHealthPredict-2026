// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize spotlight effect
    const spotlight = document.getElementById('spotlight');
    if (spotlight) {
        window.addEventListener('mousemove', e => {
            spotlight.style.setProperty('--x', e.clientX + 'px');
            spotlight.style.setProperty('--y', e.clientY + 'px');
        });
    }
});

function navigateTo(page) { window.location.href = page; }

function toggleAuth() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.toggle('hidden');
}

function switchAuth() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    if (loginForm && signupForm) {
        loginForm.classList.toggle('hidden');
        signupForm.classList.toggle('hidden');
    }
}

function handleAuth(type) {
    console.log(`${type === 'login' ? 'Login' : 'Registration'} attempted`);
    toggleAuth();
}

let currentAnalysisData = null;

function handleFileUpload(event) {
    const file = event.target.files[0];
    const fileName = document.getElementById('file-name');
    
    if (file) {
        fileName.textContent = file.name;
        fileName.classList.remove('text-gray-400');
        fileName.classList.add('text-blue-400', 'font-medium');
    } else {
        fileName.textContent = 'Choose file or drag & drop';
        fileName.classList.remove('text-blue-400', 'font-medium');
        fileName.classList.add('text-gray-400');
    }
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function generateCarePrecautions(score, disease, status) {
    const careSection = document.getElementById('care-precautions-section');
    const careContent = document.getElementById('care-content');
    
    if (!careSection || !careContent) return;
    
    const diseasePrecautions = {
        'Cardiovascular': [
            { icon: 'heart-pulse', color: 'text-red-400', title: 'Heart Health', desc: 'Monitor heart rate regularly. Avoid excessive physical exertion.' },
            { icon: 'activity', color: 'text-orange-400', title: 'Blood Pressure Monitoring', desc: 'Check blood pressure twice daily. Keep a log of readings.' },
            { icon: 'utensils-crossed', color: 'text-green-400', title: 'Dietary Guidelines', desc: 'Follow a heart-healthy diet rich in fruits and vegetables.' }
        ],
        'Diabetes': [
            { icon: 'syringe', color: 'text-blue-400', title: 'Blood Sugar Management', desc: 'Monitor blood glucose levels as prescribed. Take medications on schedule.' },
            { icon: 'footprints', color: 'text-purple-400', title: 'Foot Care', desc: 'Inspect feet daily for cuts, blisters, or sores. Maintain good hygiene.' },
            { icon: 'apple', color: 'text-green-400', title: 'Nutrition Plan', desc: 'Follow a balanced meal plan. Monitor carbohydrate intake.' }
        ],
        'Respiratory': [
            { icon: 'wind', color: 'text-cyan-400', title: 'Air Quality', desc: 'Avoid smoke, dust, and pollutants. Use air purifiers if needed.' },
            { icon: 'lungs', color: 'text-blue-400', title: 'Breathing Exercises', desc: 'Practice deep breathing exercises daily. Use prescribed inhalers correctly.' },
            { icon: 'shield-check', color: 'text-yellow-400', title: 'Infection Prevention', desc: 'Get annual vaccines. Wash hands frequently. Avoid crowded places.' }
        ],
        'Renal': [
            { icon: 'droplet', color: 'text-blue-400', title: 'Fluid Management', desc: 'Monitor fluid intake. Track daily weight. Report swelling.' },
            { icon: 'scale', color: 'text-purple-400', title: 'Dietary Restrictions', desc: 'Limit protein, sodium, potassium, and phosphorus as advised.' },
            { icon: 'pill', color: 'text-orange-400', title: 'Medication Compliance', desc: 'Take medications as prescribed. Avoid NSAIDs unless approved.' }
        ]
    };
    
    let precautions = diseasePrecautions[disease] || diseasePrecautions['Cardiovascular'];
    
    if (score > 50) {
        precautions.push(
            { icon: 'calendar-check', color: 'text-blue-400', title: 'Regular Follow-ups', desc: 'Schedule appointments every 2-4 weeks. Keep all medical appointments.' },
            { icon: 'phone-call', color: 'text-red-400', title: 'Emergency Contacts', desc: 'Keep emergency numbers handy. Know when to seek immediate care.' }
        );
    } else {
        precautions.push(
            { icon: 'calendar-check', color: 'text-blue-400', title: 'Regular Follow-ups', desc: 'Schedule routine check-ups every 3-6 months. Maintain contact with provider.' },
            { icon: 'shield-check', color: 'text-green-400', title: 'Preventive Care', desc: 'Continue treatment plan. Stay active within recommended limits.' }
        );
    }
    
    careContent.innerHTML = precautions.map(prec => `
        <div class="p-4 bg-white/5 rounded-2xl border border-white/10">
            <div class="flex items-start gap-3">
                <i data-lucide="${prec.icon}" class="w-5 h-5 ${prec.color} mt-0.5 flex-shrink-0"></i>
                <div>
                    <p class="font-bold text-sm mb-1">${prec.title}</p>
                    <p class="text-xs text-gray-400">${prec.desc}</p>
                </div>
            </div>
        </div>
    `).join('');
    
    careSection.classList.remove('hidden');
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function downloadReport() {
    if (!currentAnalysisData) {
        alert('No analysis data available. Please run analysis first.');
        return;
    }
    
    const { score, status, disease, age, gender, bp, bmi, admissionStatus, timestamp } = currentAnalysisData;
    
    const reportContent = `
CLINICAL RISK ASSESSMENT REPORT
Sanjeevani Healthcare Analytics Platform
Generated: ${timestamp}

═══════════════════════════════════════════════════════════

PATIENT INFORMATION
───────────────────────────────────────────────────────────
Primary Condition: ${disease}
Admission Status: ${admissionStatus}
Age: ${age} years
Gender: ${gender}

VITAL SIGNS
───────────────────────────────────────────────────────────
Blood Pressure: ${bp} mmHg
BMI Index: ${bmi}

CLINICAL RISK ASSESSMENT
───────────────────────────────────────────────────────────
Risk Score: ${score}%
Status: ${status}

═══════════════════════════════════════════════════════════
Report ID: ${Date.now()}
    `.trim();
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Clinical_Report_Assessment_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function calculateBMI() {
    const heightCm = parseFloat(document.getElementById('calc-height').value);
    const weightKg = parseFloat(document.getElementById('calc-weight').value);
    const bmiInput = document.getElementById('computed-bmi');
    
    if (heightCm > 0 && weightKg > 0) {
        const bmi = (weightKg / Math.pow(heightCm / 100, 2)).toFixed(1);
        bmiInput.value = bmi;
        bmiInput.classList.add('shadow-[0_0_15px_rgba(96,165,250,0.5)]');
        setTimeout(() => bmiInput.classList.remove('shadow-[0_0_15px_rgba(96,165,250,0.5)]'), 1000);
    } else {
        alert("Please enter valid height and weight values.");
    }
}

function runAnalysis() {
    const btn = document.getElementById('analyze-btn');
    const res = document.getElementById('result-box');
    const suggestionsBox = document.getElementById('high-risk-suggestions');
    const downloadBtn = document.getElementById('download-btn');
    const careSection = document.getElementById('care-precautions-section');

    if (!btn || !res) return;

    const sysBp = parseInt(document.getElementById('sys-bp').value) || 0;
    const diaBp = parseInt(document.getElementById('dia-bp').value) || 0;
    const chol = parseInt(document.getElementById('cholesterol').value) || 0;
    const bmi = parseFloat(document.getElementById('computed-bmi').value) || 0;
    const diabetes = document.getElementById('diabetes') ? document.getElementById('diabetes').value : 'No';
    const hypertension = document.getElementById('hypertension') ? document.getElementById('hypertension').value : 'No';
    const age = document.getElementById('patient-age') ? document.getElementById('patient-age').value : 'N/A';
    const gender = document.getElementById('patient-gender') ? document.getElementById('patient-gender').value : 'N/A';
    const patientName = document.getElementById('patient-name') ? document.getElementById('patient-name').value : 'Unknown Patient';

    btn.innerHTML = `Synthesizing Data... <i data-lucide="refresh-cw" class="w-5 h-5 animate-spin"></i>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();

    if (suggestionsBox) suggestionsBox.classList.add('hidden');
    if (careSection) careSection.classList.add('hidden');
    if (downloadBtn) downloadBtn.classList.add('hidden');

    setTimeout(() => {
        let riskFactors = [], recommendations = [], score = 15;

        if (sysBp > 140 || diaBp > 90) {
            riskFactors.push(`Elevated Blood Pressure: ${sysBp}/${diaBp} mmHg`);
            recommendations.push("Monitor BP daily. Restrict sodium intake and avoid stress.");
            score += 35;
        }
        if (chol > 240) {
            riskFactors.push(`High Cholesterol Level: ${chol} mg/dL`);
            recommendations.push("Adopt a low saturated-fat diet. Consult a physician for statin evaluation.");
            score += 25;
        }
        if (bmi >= 30) {
            riskFactors.push(`BMI of ${bmi} indicates clinical obesity`);
            recommendations.push("Engage in regular cardiovascular exercise. Seek dietary planning.");
            score += 15;
        }
        if (diabetes === "Yes") {
            riskFactors.push("Existing Diabetes history");
            score += 10;
        }
        if (hypertension === "Yes") {
            riskFactors.push("Existing Hypertension history");
            score += 10;
        }

        score = Math.min(score, 98);
        let isHighRisk = score >= 60;
        let status = isHighRisk ? "High Risk" : "Stable";
        let color = isHighRisk ? "text-red-400" : "text-blue-400";

        const newPatient = {
            id: Date.now().toString(),
            name: patientName || 'Unknown Patient',
            age: age,
            disease: 'General Assessment',
            risk: score,
            hr: 75, 
            bp: `${sysBp}/${diaBp}`,
            bmi: bmi
        };

        let savedPatients = JSON.parse(localStorage.getItem('sanjeevani_patients')) || [];
        savedPatients.unshift(newPatient);
        localStorage.setItem('sanjeevani_patients', JSON.stringify(savedPatients));

        res.innerHTML = `
            <div class="animate-in fade-in duration-500 w-full">
                <div class="text-7xl font-black ${color} mb-2">${score}%</div>
                <p class="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8">Clinical Risk Index</p>
                <div class="text-left space-y-4">
                    <div class="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <p class="${color} font-bold text-[10px] uppercase mb-1">AI Insight</p>
                        <p class="text-gray-300 text-xs">Patient displays ${status.toLowerCase()} metrics based on recent dataset inputs.</p>
                    </div>
                </div>
            </div>
        `;

        currentAnalysisData = { score, status, age, gender, bp: `${sysBp}/${diaBp}`, bmi, disease: "General Vitals Assessment", admissionStatus: "N/A", timestamp: new Date().toLocaleString() };

        if (isHighRisk && suggestionsBox) {
            document.getElementById('dynamic-causes').innerHTML = riskFactors.length > 0 ? riskFactors.map(f => `<li>${f}</li>`).join('') : `<li>Multiple interacting clinical factors elevated.</li>`;
            document.getElementById('dynamic-recommendations').innerHTML = recommendations.length > 0 ? recommendations.map(r => `<li>${r}</li>`).join('') : `<li>Consult a healthcare professional immediately.</li>`;
            suggestionsBox.classList.remove('hidden');
        } else if (careSection && !isHighRisk) {
            generateCarePrecautions(score, "Cardiovascular", status);
        }

        if (downloadBtn) downloadBtn.classList.remove('hidden');
        btn.innerHTML = `Analyze & Generate Report <i data-lucide="file-text" class="w-5 h-5"></i>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 1500);
}

function toggleLanguageMenu() {
    const menu = document.getElementById('language-menu');
    if (menu) menu.classList.toggle('hidden');
}

function changeLanguage(langCode, langName) {
    const currentLang = document.getElementById('current-lang');
    if (currentLang) currentLang.textContent = langName;
    const menu = document.getElementById('language-menu');
    if (menu) menu.classList.add('hidden');
    localStorage.setItem('preferred-language', langCode);
}

document.addEventListener('click', function(event) {
    const langMenu = document.getElementById('language-menu');
    const langButton = event.target.closest('[onclick="toggleLanguageMenu()"]');
    if (langMenu && !langMenu.contains(event.target) && !langButton) langMenu.classList.add('hidden');
});

function initChart(currentRisk = null) {
    const canvas = document.getElementById('dashboardChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (window.myChart) window.myChart.destroy();
    
    let chartData = [42, 35, 28, 15]; 
    let isImproving = true;
    
    if (currentRisk !== null) {
        let val1 = Math.min(100, Math.max(0, currentRisk + 12)); 
        let val2 = Math.min(100, Math.max(0, currentRisk - 8));  
        let val3 = Math.min(100, Math.max(0, currentRisk + 5));  
        chartData = [val1, val2, val3, currentRisk];             
        isImproving = chartData[0] > currentRisk;
    }
    
    const badgeElement = document.querySelector('#dashboardChart').parentElement.querySelector('div.bg-green-500\\/10, div.bg-red-500\\/10');
    if(badgeElement) {
        if(isImproving) {
            badgeElement.className = "bg-green-500/10 text-green-400 text-[12px] px-3 py-1 rounded-full font-bold border border-green-500/20";
            badgeElement.textContent = "Improving";
        } else {
            badgeElement.className = "bg-red-500/10 text-red-400 text-[12px] px-3 py-1 rounded-full font-bold border border-red-500/20";
            badgeElement.textContent = "Critical";
        }
    }

    if (typeof Chart !== 'undefined') {
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Patient Risk Trend',
                    data: chartData,
                    borderColor: '#60A5FA',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, min: 0, max: 100 } }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('dashboardChart')) {
        initChart();
        loadDashboardPatients();
    }
});

function loadDashboardPatients() {
    const patientListContainer = document.querySelector('.lg\\:col-span-3 .space-y-2');
    if (!patientListContainer) return;

    const savedPatients = JSON.parse(localStorage.getItem('sanjeevani_patients')) || [];
    
    if (savedPatients.length > 0) {
        patientListContainer.innerHTML = ''; 
        
        savedPatients.forEach((patient, index) => {
            let riskColor = patient.risk >= 60 ? 'red' : (patient.risk >= 30 ? 'yellow' : 'blue');
            
            const patientHTML = `
                <div class="patient-item p-4 rounded-2xl border border-white/5 cursor-pointer transition-all ${index === 0 ? 'bg-white/5' : ''}" onclick="selectSavedPatient('${patient.id}', this)">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-bold text-sm">${patient.name}</p>
                            <p class="text-[10px] text-gray-500">Age ${patient.age} • ${patient.disease}</p>
                        </div>
                        <span class="bg-${riskColor}-500/20 text-${riskColor}-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-${riskColor}-500/30">${patient.risk}%</span>
                    </div>
                </div>
            `;
            patientListContainer.innerHTML += patientHTML;
        });

        selectSavedPatient(savedPatients[0].id, patientListContainer.firstElementChild);
    }
}

function selectSavedPatient(id, element) {
    document.querySelectorAll('.patient-item').forEach(item => item.classList.remove('bg-white/5'));
    if (element) element.classList.add('bg-white/5');

    const savedPatients = JSON.parse(localStorage.getItem('sanjeevani_patients')) || [];
    const patient = savedPatients.find(p => p.id === id);

    if (patient) {
        const riskEl = document.getElementById('dash-risk');
        const statValues = document.querySelectorAll('.text-2xl.font-black'); 
        
        if (riskEl) riskEl.textContent = patient.risk + '%';
        if (statValues[1]) statValues[1].textContent = patient.hr + ' bpm';
        if (statValues[2]) statValues[2].textContent = patient.bp;
        if (statValues[3]) statValues[3].textContent = patient.bmi;
        
        initChart(patient.risk);
    }
}