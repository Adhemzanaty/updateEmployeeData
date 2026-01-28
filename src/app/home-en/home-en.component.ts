import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-en',
  standalone: false,
  templateUrl: './home-en.component.html',
  styleUrl: './home-en.component.css'
})
export class HomeEnComponent {



  spouseName = '';
  isFatherDie = '';
  isMotherDie = '';



  allData:any;
  jobNumber:any;

  // Options for dropdowns
  maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed'];
  genderOptions = ['Male', 'Female'];
  spouseStatusOptions = ['Working', 'Not Working'];
  yesNoOptions = ['Yes', 'No'];
  employeeCategoryOptions = ['Civil', 'Military', 'Health', 'Educational', 'Academic', 'Engineering', 'Administrative', 'Technical', 'Legal', 'Security'];
  employmentStatusOptions = ['Main', 'Leave', 'Assignment'];
  studySystemOptions = ['Regular', 'Enrollment', 'Evening', 'Parallel Study'];
  leaveTypeOptions = ['Unpaid', 'Patient Accompaniment'];
  qualificationTypeOptions = ['University', 'Institute', 'Diploma', 'Training', 'Academic'];
  
  constructor(public _APIService: APIService , private fb: FormBuilder , private _Router:Router) {
  }

  ngOnInit(): void {
    this.resetForm();

      // جلب الداتا
      this.getObject();
      this.getObject2();

      this.setupFormControls();
          }
  


      // القسم الأول: البيانات الأساسية والتعريفية (13 حقل)
      employeeForm = new FormGroup({
        // الحقول 1-7: البيانات الشخصية الأساسية
        fullName: new FormControl('' , [Validators.required ]),

        // firstName: new FormControl('' , [Validators.required ]),
        // secondName: new FormControl('' , [Validators.required ]),
        // thirdName: new FormControl('' , [Validators.required ]),
        // lastName: new FormControl('' , [Validators.required ]),

        nationalId: new FormControl('' , [Validators.required ]),
        dateOfBirth: new FormControl('' , [Validators.required ]),
        nationality: new FormControl('' , [Validators.required ]),
        gender: new FormControl('' , [Validators.required ]),
        placeOfBirth: new FormControl('' , [Validators.required ]),
        // الحقول 8-13: بيانات التواصل والإقامة
        mobileNumber: new FormControl('', [Validators.required, Validators.pattern(/^05\d{8}$/)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        nationalAddress: new FormControl('' , [Validators.required ]),
        district: new FormControl(''),
        currentResidence: new FormControl('' , [Validators.required ]),
        city: new FormControl('' ),

      // القسم الثاني: الحالة الاجتماعية والعائلية (11 حقل)

        // الحقول 14-18: بيانات الزوج/الزوجة
        spouseName: new FormControl('' , [Validators.required ]),
        spouseNationalId: new FormControl('' , [Validators.required ]),
        maritalStatus: new FormControl('' , [Validators.required ]),
        spouseMobileNumber: new FormControl(''),
        spouseDateOfBirth: new FormControl(''),
        spouseStatus: new FormControl(''),
        // الحقول 19-24: بيانات الأبناء والمعالين
        hasDependents: new FormControl('' , [Validators.required ]),
        numberOfChildren: new FormControl('', [Validators.required, Validators.min(0)]),
        fromMartyrsFamilies: new FormControl('' , [Validators.required ]),
        numberOfDependents: new FormControl('', [Validators.min(0)]),
        personOfDetermination: new FormControl('' , [Validators.required ]),
        degreeOfKinship: new FormControl(''),

      // القسم الثالث: بيانات الوالدين والطوارئ (12 حقل)
        // الحقول 25-30: بيانات الأب والأم
        fatherDie: new FormControl('' , [Validators.required ]),
        motherDie: new FormControl('' , [Validators.required ]),
        fatherName: new FormControl('' , [Validators.required ]),
        fatherMobileNumber: new FormControl('' , [Validators.required ]),
        fatherResidence: new FormControl(''),
        motherName: new FormControl('' , [Validators.required ]),
        motherMobileNumber: new FormControl('' , [Validators.required ]),
        motherResidence: new FormControl(''),
        fatherBirthDate: new FormControl(''),
        motherBirthDate: new FormControl(''),
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


         // === الحقول الجديدة ===
        // القسم 12: بيانات التكليف (6 حقول جديدة)
        isAssigned: new FormControl('', [Validators.required]), // حقل إجباري
        isAssignmentContinuous: new FormControl('', [Validators.required]), // حقل إجباري
        

        
      })

      handleDateChange(event: any, fieldName: string) {
        const dateValue = event.target.value;
        
        if (dateValue) {
          // تحويل من 2024-12-31 إلى 12/31/2024
          const [year, month, day] = dateValue.split('-');
          const formattedDate = `${day}/${month}/${year}`;
          
          // تحديث الفورم
          this.employeeForm.patchValue({
            [fieldName]: formattedDate
          });

          console.log(formattedDate);
          
          // تحديث الـ model - مع التأكد من وجوده
          if (this.allData) {
            if (!this.allData[fieldName]) {
              this.allData[fieldName] = '';
            }
            this.allData[fieldName] = formattedDate;
          }
        }
      }
      formatDateForDisplay(dateString: string | undefined | null): string {
        if (!dateString) return '';
        
        try {
          const [day, month, year] = dateString.split('/');
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } catch (error) {
          return '';
        }
      }
      

      maritalStatus(option:any){

        if(option == "Married"){
          console.log("not azab");
          this.spouseName = '' ;

        }else{
          this.spouseName = 'nothing' ;
        }

      }

      fatherDie(x:any){
        if(x == "1"){
          this.isFatherDie = 'dead'
        }else{
          this.isFatherDie = ''
        }
      }

      motherDie(x:any){
        if(x == "1"){
          this.isMotherDie = 'dead'
        }else{
          this.isMotherDie = ''
        }
      }

      // دالة واحدة للتحكم في كل شيء

      setupFormControls() {
        // عند تغيير "هل أنت مكلف؟"
        this.employeeForm.get('isAssigned')?.valueChanges.subscribe(value => {
          this.updateAssignmentFields();
        });
      
        // عند تغيير "هل التكليف مستمر؟"
        this.employeeForm.get('isAssignmentContinuous')?.valueChanges.subscribe(value => {
          this.updateAssignmentFields();
        });
      }
      
      // دالة واحدة تعمل كل شيء
      updateAssignmentFields() {
        const isAssigned = this.employeeForm.get('isAssigned')?.value;
        const isContinuous = this.employeeForm.get('isAssignmentContinuous')?.value;
        
        // الحقول المراد التحكم فيها
        const fields = [
          'assignmentDepartment',
          'assignmentOrganization', 
          'assignmentStartDate',
          'assignmentEndDate'
        ];
        
        fields.forEach(fieldName => {
          const field = this.employeeForm.get(fieldName);
          
          if (isAssigned === 'yes') {
            // إذا كان مكلف ← جميع الحقول إجبارية
            if (fieldName === 'assignmentEndDate' && isContinuous === 'yes') {
              // إذا كان مستمر ← الحقل readOnly + قيمة "مستمر"
              field?.setValue('continuous');
              
              field?.clearValidators();
            } else {
              // بقية الحقول أو إذا مش مستمر ← required
              field?.enable();
              field?.setValidators(Validators.required);
              
              // إذا كان حقل تاريخ النهاية ومش مستمر، تأكد من تنظيف القيمة
              if (fieldName === 'assignmentEndDate' && isContinuous === 'no' && field?.value === 'continuous') {
                field?.setValue('');
              }
            }
          } else {
            // إذا لم يكن مكلف ← كل الحقول مش إجبارية
            field?.setValue('');
            field?.enable();
            field?.clearValidators();
          }
          
          field?.updateValueAndValidity();
        });
      }
      getObject() {
        this.allData = this._APIService.getData();
        // console.log(this.allData);
         // هتظهر الاوبجيكت

         if( this.allData.gender == 'MALE' ){

          this.allData.gender = 'MALE' ;

         }else if( this.allData.gender == 'FEMALE' ){

          this.allData.gender = 'FEMALE' ;

         }
    
        return this.allData;
      }
      getObject2() {
        this.jobNumber = this._APIService.getData2();
        // console.log(this.jobNumber);
         // هتظهر الاوبجيكت
        return this.jobNumber;
      }

  onSubmit(x:any){


  console.log(x.value);

  this._APIService.show();

   this._APIService.EmpInformationUpdate(x.value).subscribe({
    next: (response) => {
      // في حالة النجاح (status 200)
      console.log('Request succeeded with status 200');
      
      if (response.isSuccess) {
        alert('Thanks, Info recieved successfully');
        this._Router.navigate(['/login']);
      } else {
        alert('Sorry, Some Error Occurred :' + response.message);
      }
    },
    error: (error) => {
      // في حالة فشل الطلب (مثل 400، 404، 500، إلخ)
      const statusCode = error.status; // رقم الاستيتس هنا
      const errorMessage = error.message || 'Sorry, Some Error Occurred';
      
      console.log(`Request failed with status: ${statusCode}`);
      alert(`Sorry, Some Error Occurred  (${statusCode}): ${errorMessage}`);
    },
    complete: () => {
      // تُنفّذ بعد اكتمال الطلب (نجاحاً أو فشلاً)
      console.log('Request completed');
      this._APIService.hide();

    }
  });

  this.resetForm();
  }



  resetForm(): void {
    this.employeeForm.reset();
  }

}
