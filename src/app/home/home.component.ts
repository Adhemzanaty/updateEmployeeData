import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../api.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  




  
  // Options for dropdowns
  maritalStatusOptions = ['أعزب', 'متزوج', 'مطلق', 'أرمل'];
  genderOptions = ['ذكر', 'أنثى'];
  spouseStatusOptions = ['يعمل', 'لا يعمل'];
  yesNoOptions = ['نعم', 'لا'];
  employeeCategoryOptions = ['مدني', 'عسكري', 'صحي', 'تعليمي', 'أكاديمي', 'هندسي', 'إداري', 'تقني', 'قانوني', 'أمني'];
  employmentStatusOptions = ['أساسي', 'إجازة', 'تكليف'];
  studySystemOptions = ['النظام', 'انتساب', 'مسائي', 'دراسة موازية'];
  leaveTypeOptions = ['بدون راتب', 'مرافقة مريض'];
  qualificationTypeOptions = ['جامعة', 'معهد', 'دبلوم', 'تدريبي', 'دراسي'];
  
  constructor(private _APIService: APIService , private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.resetForm();
  }


      // القسم الأول: البيانات الأساسية والتعريفية (13 حقل)
      employeeForm = new FormGroup({
        // الحقول 1-7: البيانات الشخصية الأساسية
        fullName: new FormControl('' , [Validators.required ]),
        nationalId: new FormControl('' , [Validators.required ]),
        dateOfBirth: new FormControl('' , [Validators.required ]),
        nationality: new FormControl('' , [Validators.required ]),
        gender: new FormControl('' , [Validators.required ]),
        placeOfBirth: new FormControl('' , [Validators.required ]),
        // الحقول 8-13: بيانات التواصل والإقامة
        mobileNumber: new FormControl('', [Validators.required, Validators.pattern(/^05\d{8}$/)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        nationalAddress: new FormControl('' , [Validators.required ]),
        district: new FormControl('' , [Validators.required ]),
        currentResidence: new FormControl('' , [Validators.required ]),
        city: new FormControl('' , [Validators.required ]),

      // القسم الثاني: الحالة الاجتماعية والعائلية (11 حقل)

        // الحقول 14-18: بيانات الزوج/الزوجة
        spouseName: new FormControl(''),
        maritalStatus: new FormControl('' , [Validators.required ]),
        spouseMobileNumber: new FormControl(''),
        spouseDateOfBirth: new FormControl(''),
        spouseStatus: new FormControl(''),
        // الحقول 19-24: بيانات الأبناء والمعالين
        hasDependents: new FormControl('' , [Validators.required ]),
        numberOfChildren: new FormControl(0, [Validators.required, Validators.min(0)]),
        fromMartyrsFamilies: new FormControl('' , [Validators.required ]),
        numberOfDependents: new FormControl(0, [Validators.min(0)]),
        personOfDetermination: new FormControl('' , [Validators.required ]),
        degreeOfKinship: new FormControl(''),

      // القسم الثالث: بيانات الوالدين والطوارئ (12 حقل)
        // الحقول 25-30: بيانات الأب والأم
        fatherName: new FormControl('' , [Validators.required ]),
        fatherMobileNumber: new FormControl(['', Validators.pattern(/^05\d{8}$/)]),
        fatherResidence: new FormControl(''),
        motherName: new FormControl('' , [Validators.required ]),
        motherMobileNumber: new FormControl('', Validators.pattern(/^05\d{8}$/)),
        motherResidence: new FormControl(''),
        // الحقول 31-36: بيانات شخص الطوارئ
        emergencyContactName: new FormControl('' , [Validators.required ]),
        emergencyContactNumber: new FormControl('', [Validators.required, Validators.pattern(/^05\d{8}$/)]),
        relationshipToEmergencyContact: new FormControl('' , [Validators.required ]),
        worksAtSameOrganization: new FormControl('' , [Validators.required ]),

      // القسم الرابع: البيانات الوظيفية الأساسية (12 حقل)
        // الحقول 37-42: المعلومات الوظيفية الأساسية
        employeeCategory: new FormControl('' , [Validators.required ]),
        employeeId: new FormControl('' , [Validators.required ]),
        currentWorkNature: new FormControl('' , [Validators.required ]),
        jobTitle: new FormControl('' , [Validators.required ]),
        gradeLevel: new FormControl('' , [Validators.required ]),
        natureWorkTitle: new FormControl('' , [Validators.required ]),
        // الحقول 43-48: التعيين، الجهة، الإدارة، القسم، الوحدة
        organization: new FormControl('' , [Validators.required ]),
        dateOfAppointment: new FormControl('' , [Validators.required ]),
        department: new FormControl('' , [Validators.required ]),
        administration: new FormControl('' , [Validators.required ]),
        employmentStatus: new FormControl('' , [Validators.required ]),
        unit: new FormControl(''),

      // القسم الخامس: بيانات المكلف من جهة أخرى (4 حقول)
        assignmentDepartment: new FormControl(''),
        assignmentOrganization: new FormControl(''),
        assignmentStartDate: new FormControl(''),
        assignmentEndDate: new FormControl(''),

      // القسم السادس: بيانات الاتبعاث والدراسة (7 حقول)
        // الحقول 54-57
        scholarshipCountry: new FormControl(''),
        scholarshipCity: new FormControl(''),
        scholarshipMajor: new FormControl(''),
        scholarshipUniversity: new FormControl(''),
        // الحقول 58-60
        scholarshipStartDate: new FormControl(''),
        degree: new FormControl(''),
        scholarshipEndDate: new FormControl(''),
        notes: new FormControl(''),

      // القسم السابع: بيانات الإجازات (4 حقول)
        leaveStartDate: new FormControl(''),
        leaveEndDate: new FormControl(''),
        leaveType: new FormControl(''),
        reasonForLeave: new FormControl(''),

      // القسم الثامن: بيانات المؤهلات العلمية (7 حقول)
        // الحقول 65-68
        educationalQualification: new FormControl('' , [Validators.required ]),
        typeOfQualification: new FormControl('' , [Validators.required ]),
        specificSpecialization: new FormControl('' , [Validators.required ]),
        generalSpecialization: new FormControl('' , [Validators.required ]),
        // الحقول 69-71
        studySystem: new FormControl('' , [Validators.required ]),
        graduationYear: new FormControl('' , [Validators.required ]),
        graduationInstitution: new FormControl('' , [Validators.required ]),
        additionalNotes: new FormControl(''),

      // القسم التاسع: بيانات التصنيف الصحي (5 حقول)
        classifiedHealthSpecialty: new FormControl(''),
        healthClassification: new FormControl(''),
        classificationNumber: new FormControl(''),
        classificationIssueDate: new FormControl(''),
        classificationExpiryDate: new FormControl(''),

      // القسم العاشر: بيانات الدورات التدريبية (6 حقول)
        courseName: new FormControl(''),
        courseIssuingOrganization: new FormControl(''),
        courseStartDate: new FormControl(''),
        courseEndDate: new FormControl(''),
        courseDuration: new FormControl(''),
        certificateNumber: new FormControl(''),

      // القسم الحادي عشر: بيانات الخبرات السابقة (5 حقول)
        previousJobTitle: new FormControl(''),
        previousOrganization: new FormControl(''),
        experienceStartDate: new FormControl(''),
        experienceEndDate: new FormControl(''),
        yearsOfExperience: new FormControl([0]),
      })


  onSubmit(x:any){
  console.log(x);


  this.resetForm();
  }

  // دالة لوضع علامة على جميع الحقول كملموسة لعرض أخطاء التحقق
  // private markFormGroupTouched(formGroup: FormGroup): void {
  //   Object.values(formGroup.controls).forEach(control => {
  //     control.markAsTouched();
  //     if (control instanceof FormGroup) {
  //       this.markFormGroupTouched(control);
  //     }
  //   });
  // }

  resetForm(): void {
    this.employeeForm.reset();
  }



}
