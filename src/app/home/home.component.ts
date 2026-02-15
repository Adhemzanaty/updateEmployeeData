import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  spouseName = '';
  spouseName2 = '';

  isFatherDie = '';
  isMotherDie = '';
  isFatherDie2 = '';
  isMotherDie2 = '';



  allData:any;
  jobNumber:any;

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
  nationalitiesList = [
    { id: 1, name: 'أذربيجاني' },
    { id: 2, name: 'أرجنتيني' },
    { id: 3, name: 'أرميني' },
    { id: 4, name: 'أسترالي' },
    { id: 5, name: 'أفغاني' },
    { id: 6, name: 'ألباني' },
    { id: 7, name: 'ألماني' },
    { id: 8, name: 'أمريكي' },
    { id: 9, name: 'أندوري' },
    { id: 10, name: 'أندونيسي' },
    { id: 11, name: 'أنغولي' },
    { id: 12, name: 'أوروغواي' },
    { id: 13, name: 'أوزبكي' },
    { id: 14, name: 'أوغندي' },
    { id: 15, name: 'أوكراني' },
    { id: 16, name: 'أيرلندي' },
    { id: 17, name: 'أيسلندي' },
    { id: 18, name: 'إسباني' },
    { id: 19, name: 'إستوني' },
    { id: 20, name: 'إسرائيلي' },
    { id: 21, name: 'إسواتيني' },
    { id: 22, name: 'إكوادوري' },
    { id: 23, name: 'إماراتي' },
    { id: 24, name: 'إندونيسي' },
    { id: 25, name: 'إيراني' },
    { id: 26, name: 'إيطالي' },
    { id: 27, name: 'باكستاني' },
    { id: 28, name: 'بالاوي' },
    { id: 29, name: 'برازيلي' },
    { id: 30, name: 'برتغالي' },
    { id: 31, name: 'برمودي' },
    { id: 32, name: 'بروني' },
    { id: 33, name: 'بلجيكي' },
    { id: 34, name: 'بلغاري' },
    { id: 35, name: 'بنجلاديشي' },
    { id: 36, name: 'بنمي' },
    { id: 37, name: 'بنيني' },
    { id: 38, name: 'بوتاني' },
    { id: 39, name: 'بوتسواني' },
    { id: 40, name: 'بوروندي' },
    { id: 41, name: 'بولندي' },
    { id: 42, name: 'بوليفي' },
    { id: 43, name: 'بيروفي' },
    { id: 44, name: 'بيلاروسي' },
    { id: 45, name: 'تايلاندي' },
    { id: 46, name: 'تايواني' },
    { id: 47, name: 'تركي' },
    { id: 48, name: 'تركماني' },
    { id: 49, name: 'تشادي' },
    { id: 50, name: 'تشيلي' },
    { id: 51, name: 'تنزاني' },
    { id: 52, name: 'توغوي' },
    { id: 53, name: 'توفالي' },
    { id: 54, name: 'تونسي' },
    { id: 55, name: 'تيموري' },
    { id: 56, name: 'جامايكي' },
    { id: 57, name: 'جيبوتي' },
    { id: 58, name: 'جورجي' },
    { id: 59, name: 'دومينيكي' },
    { id: 60, name: 'رواندي' },
    { id: 61, name: 'روس' },
    { id: 62, name: 'روماني' },
    { id: 63, name: 'زامبي' },
    { id: 64, name: 'زيمبابوي' },
    { id: 65, name: 'سامواي' },
    { id: 66, name: 'سريلانكي' },
    { id: 67, name: 'سلفادوري' },
    { id: 68, name: 'سامري' },
    { id: 69, name: 'سنغالي' },
    { id: 70, name: 'سوازيلندي' },
    { id: 71, name: 'سويدي' },
    { id: 72, name: 'سويسري' },
    { id: 73, name: 'سيراليوني' },
    { id: 74, name: 'سيشلي' },
    { id: 75, name: 'صيني' },
    { id: 76, name: 'طاجيكي' },
    { id: 77, name: 'عراقي' },
    { id: 78, name: 'عماني' },
    { id: 79, name: 'غامبي' },
    { id: 80, name: 'غاني' },
    { id: 81, name: 'غواتيمالي' },
    { id: 82, name: 'غوياني' },
    { id: 83, name: 'غيني' },
    { id: 84, name: 'فرنسي' },
    { id: 85, name: 'فلبيني' },
    { id: 86, name: 'فنلندي' },
    { id: 87, name: 'فنزويلي' },
    { id: 88, name: 'فيتنامي' },
    { id: 89, name: 'قبرصي' },
    { id: 90, name: 'قطري' },
    { id: 91, name: 'قيرغيزي' },
    { id: 92, name: 'كازاخستاني' },
    { id: 93, name: 'كرواتي' },
    { id: 94, name: 'كمبودي' },
    { id: 95, name: 'كندي' },
    { id: 96, name: 'كوبي' },
    { id: 97, name: 'كويتي' },
    { id: 98, name: 'كوري جنوبي' },
    { id: 99, name: 'كوري شمالي' },
    { id: 100, name: 'كولومبي' },
    { id: 101, name: 'كونغولي' },
    { id: 102, name: 'كوسوفي' },
    { id: 103, name: 'كينيا' },
    { id: 104, name: 'لاتفي' },
    { id: 105, name: 'لبناني' },
    { id: 106, name: 'لوكسمبورغي' },
    { id: 107, name: 'ليبيري' },
    { id: 108, name: 'ليبي' },
    { id: 109, name: 'ليتواني' },
    { id: 110, name: 'ليسوتو' },
    { id: 111, name: 'مالطي' },
    { id: 112, name: 'مالي' },
    { id: 113, name: 'ماليزي' },
    { id: 114, name: 'مغربي' },
    { id: 115, name: 'مكسيكي' },
    { id: 116, name: 'منغولي' },
    { id: 117, name: 'موريتاني' },
    { id: 118, name: 'موريشيوسي' },
    { id: 119, name: 'موزمبيقي' },
    { id: 120, name: 'مولدوفي' },
    { id: 121, name: 'موناكو' },
    { id: 122, name: 'ميانماري' },
    { id: 123, name: 'ناميبي' },
    { id: 124, name: 'نيبال' },
    { id: 125, name: 'نيجيري' },
    { id: 126, name: 'نيكاراغوي' },
    { id: 127, name: 'نيوزيلندي' },
    { id: 128, name: 'هندي' },
    { id: 129, name: 'هندوراسي' },
    { id: 130, name: 'هولندي' },
    { id: 131, name: 'ياباني' },
    { id: 132, name: 'يمني' },
    { id: 133, name: 'يوناني' },
    { id: 134, name: 'جيبوتي' },
    { id: 135, name: 'مقدوني' },
    { id: 136, name: 'جزر سليمان' },
    { id: 137, name: 'جزر القمر' },
    { id: 138, name: 'جزر المالديف' },
    { id: 139, name: 'سانت لوسيا' },
    { id: 140, name: 'سانت فينسنت' },
    { id: 141, name: 'سانت كيتس' },
    { id: 142, name: 'باربادوس' },
    { id: 143, name: 'بليز' },
    { id: 144, name: 'بابوا غينيا' },
    { id: 145, name: 'توفالو' },
    { id: 146, name: 'كيريباتي' },
    { id: 147, name: 'ناورو' },
    { id: 148, name: 'فانواتو' },
    { id: 149, name: 'تونغا' },
    { id: 150, name: 'ساموا' },
    { id: 151, name: 'جزائري' },
    { id: 152, name: 'بحريني' },
    { id: 153, name: 'سعودي' },
    { id: 154, name: 'سوداني' },
    { id: 155, name: 'سوري' },
    { id: 156, name: 'صومالي' },
    { id: 157, name: 'عربي' },
    { id: 158, name: 'فلسطيني' },
    { id: 159, name: 'قبطي' },
    { id: 160, name: 'لبناني' },
    { id: 161, name: 'ليبي' },
    { id: 162, name: 'مصري' },
    { id: 163, name: 'مغربي' },
    { id: 164, name: 'يمني' },
    { id: 165, name: 'أردني' },
    { id: 166, name: 'إماراتي' },
    { id: 167, name: 'كويتي' },
    { id: 168, name: 'قطري' },
    { id: 169, name: 'عماني' },
    { id: 170, name: 'تونسي' }
  ];
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

        if(option == "متزوج"){
          console.log("not azab");
          this.spouseName = '' ;
          this.spouseName2 = '' ;

          

        }else{
          this.spouseName = 'لا يوجد' ;
          this.spouseName2 = 'يوجد' ;

        }

      }

      fatherDie(x:any){
        if(x == "1"){
          this.isFatherDie = 'متوفي';
          this.isFatherDie2 = 'متوفي';

        }else{
          this.isFatherDie = '';
          this.isFatherDie2 = '';

        }
      }

      motherDie(x:any){
        if(x == "1"){
          this.isMotherDie = 'متوفية';
          this.isMotherDie2 = 'متوفية';
        }else{
          this.isMotherDie = '';
          this.isMotherDie2 = '';
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
              field?.setValue('مستمر');
              
              field?.clearValidators();
            } else {
              // بقية الحقول أو إذا مش مستمر ← required
              field?.enable();
              field?.setValidators(Validators.required);
              
              // إذا كان حقل تاريخ النهاية ومش مستمر، تأكد من تنظيف القيمة
              if (fieldName === 'assignmentEndDate' && isContinuous === 'no' && field?.value === 'مستمر') {
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
        console.log(this.allData);
         // هتظهر الاوبجيكت

         if( this.allData.gender == 'MALE' ){

          this.allData.gender = 'ذكر' ;

         }else if( this.allData.gender == 'FEMALE' ){

          this.allData.gender = 'انثى' ;

         }
    
        return this.allData;
      }
      getObject2() {
        this.jobNumber = this._APIService.getData2();
        // console.log(this.jobNumber);
         // هتظهر الاوبجيكت
        return this.jobNumber;
      }


      
      onSubmit(x: any) {
        console.log(x.value);
        this._APIService.show();
      
        if (this.employeeForm.valid) {
          this._APIService.EmpInformationUpdate(x.value).subscribe({
            next: (response) => {
              console.log('Request succeeded with status 200');
              
              if (response.isSuccess) {
                alert('تم تسجيل بياناتك بنجاح شكراً لك');
                this._Router.navigate(['/login']);
                this.resetForm();

              } else {
                alert('الرجاء المحاولة في وقت لاحق');
              }
            },
            error: (error) => {
              const statusCode = error.status;
              const errorMessage = error.message || 'حدث خطأ غير معروف';
              console.log(error);
              this._APIService.hide();

              console.log(`Request failed with status: ${statusCode}`);
              alert(`حدث خطأ (${statusCode}): ${error}`);
            },
            complete: () => {
              console.log('Request completed');
              this._APIService.hide();
            }
          });
          
          console.log('تمام الفورم صح');
        } else {
          this._APIService.hide();
          // الفورم فيه غلط
          this.markAllFieldsTouched();
          this.scrollToFirstError();
        }
      }
      
      // دالة تتحقق من الحقول
      isFieldInvalid(fieldName: string): boolean {
        const field = this.employeeForm.get(fieldName);
        return field ? field.invalid && field.touched : false;
      }
      
      markAllFieldsTouched() {
        // بيمرّي على كل الكونترولز ويعملهم touched
        Object.keys(this.employeeForm.controls).forEach(field => {
          const control = this.employeeForm.get(field);
          if (control) {
            control.markAsTouched();
          }
        });
      }
      
      scrollToFirstError() {
        // انتظر شوية عشان الـ DOM يتحدّث
        setTimeout(() => {
          // اختار أول حقل فيه غلط
          const firstInvalidField = Object.keys(this.employeeForm.controls).find(fieldName => {
            const control = this.employeeForm.get(fieldName);
            return control?.invalid && control?.touched;
          });
          
          if (firstInvalidField) {
            // دور على العنصر في الـ DOM
            const element = document.querySelector(`[formControlName="${firstInvalidField}"]`);
            if (element) {
              element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
              
              // خلي الكيرسور يخش في الحقل
              (element as HTMLElement).focus();
            }
          }
        }, 100);
      }

  resetForm(): void {
    this.employeeForm.reset();
  }




}
