import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// استيراد مكتبات ماتيريال (بدون مسارات node_modules)
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-nephra-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatCheckboxModule, MatSlideToggleModule,
    MatIconModule, MatProgressSpinnerModule],
  templateUrl: './nephra-form.component.html',
  styleUrls: ['./nephra-form.component.css']
})
export class NephraFormComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  loading = signal(false);
  pdfLoading = signal(false);
  result = signal<any>(null);

  riskForm = this.fb.group({
    age: [62, Validators.required], isMale: [true], ethnicity: ['white'], bmi: [31.5],
    egfr: [52.0, Validators.required], egfr_Slope: [-4.2], acr: [150.0, Validators.required],
    hbA1c: [8.4], highGlucoseVariability: [true], timeInRange: [60.0], medicationCompliance: [85.0],
    sbp: [145], dbp: [88], highBPVariability: [true], totalCholesterol: [210.0],
    ldlCholesterol: [135.0], hdlCholesterol: [38.0], triglycerides: [180.0],
    diabetesDuration: [12], usesInsulin: [true], insulinDuration: [6],
    smokingStatus: ['current'], sedentaryLifestyle: [true], dietQuality: ['poor'],
    highSodiumIntake: [true], hasRetinopathy: [true], retinopathySeverity: ['moderate'],
    hasNeuropathy: [true], hasCvdHistory: [false], usesSGLT2i: [true], usesAceArb: [true],
    usesGlp1: [false], usesFinerenone: [false], usesStatin: [true]
  });

  calculateRisk() {
    this.loading.set(true);
    this.http.post('https://pshrcser.pshrc.med.sa:5678/api/Nephra/assess', this.riskForm.value).subscribe({
      next: (res) => { this.result.set(res); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  downloadPdf() {
    this.pdfLoading.set(true);
    this.http.post('https://pshrcser.pshrc.med.sa:5678/api/Nephra/report', this.riskForm.value, { responseType: 'blob' })
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a'); a.href = url; a.download = 'Report.pdf'; a.click();
          this.pdfLoading.set(false);
        },
        error: () => this.pdfLoading.set(false)
      });
  }

  getRiskClass() {
    const s = this.result()?.riskScore;
    return s > 15 ? 'risk-high' : s > 5 ? 'risk-moderate' : 'risk-low';
  }

  getBadgeClass() {
    const s = this.result()?.riskScore;
    return s > 15 ? 'bg-danger text-white' : s > 5 ? 'bg-warning' : 'bg-success text-white';
  }
}