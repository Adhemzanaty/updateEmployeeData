import { Component, OnInit , signal, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-nephra-form',
  standalone: false,
 
  templateUrl: './nephra-form.component.html',
  styleUrls: ['./nephra-form.component.css']
})
export class NephraFormComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  loading = signal(false);
  pdfLoading = signal(false);
  result = signal<any>(null);
  apiUrl = 'https://pshrcser.pshrc.med.sa:5678/api/Nephra/'; // عنوان الـ API الخاص بك

  riskForm = this.fb.group({
    age: [62], isMale: [true], ethnicity: ['white'], bmi: [31.5],
    egfr: [52.0], egfr_Slope: [-4.2], acr: [150.0],
    hbA1c: [8.4], highGlucoseVariability: [true], timeInRange: [60.0], medicationCompliance: [85.0],
    sbp: [145], dbp: [88], highBPVariability: [true],
    totalCholesterol: [210.0], ldlCholesterol: [135.0], hdlCholesterol: [38.0], triglycerides: [180.0],
    diabetesDuration: [12], usesInsulin: [true], insulinDuration: [6],
    smokingStatus: ['current'], sedentaryLifestyle: [true], dietQuality: ['poor'], highSodiumIntake: [true],
    hasRetinopathy: [true], retinopathySeverity: ['moderate'], hasNeuropathy: [true], hasCvdHistory: [false],
    usesSGLT2i: [true], usesAceArb: [true], usesGlp1: [false], usesFinerenone: [false], usesStatin: [true]
  });

  calculateRisk() {
    this.loading.set(true);
    this.http.post(`${this.apiUrl}assess`, this.riskForm.value).subscribe({
      next: (res) => {
        this.result.set(res);
        this.loading.set(false);
        console.log(res);
        alert("success");
        setTimeout(() => document.getElementById('results-area')?.scrollIntoView({behavior: 'smooth'}), 200);
      },
      error: () => this.loading.set(false)
    });
  }

  downloadPdf() {
    this.pdfLoading.set(true);
    this.http.post(`${this.apiUrl}report`, this.riskForm.value, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'NephraRisk_Report.pdf';
        a.click();
        this.pdfLoading.set(false);
      },
      error: () => this.pdfLoading.set(false)
    });
  }

  getRiskClass() {
    const score = this.result()?.riskScore;
    if (score < 5) return 'risk-low';
    if (score < 15) return 'risk-moderate';
    return 'risk-high';
  }

  getBadgeClass() {
    const score = this.result()?.riskScore;
    if (!score) return 'bg-secondary';
    
    if (score < 5) return 'bg-success text-white';      // أخضر للحالات المستقرة
    if (score < 15) return 'bg-warning text-dark';     // أصفر للحالات المتوسطة
    return 'bg-danger text-white';                     // أحمر للحالات الحرجة
  }
  
}