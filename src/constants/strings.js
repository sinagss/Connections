const strings = {
  en: {
    appBar: {
      appName: "Virtual Connections",
      homeLabel: "Home",
      connectionsLabel: "Connections",
      aboutLabel: "About",
    },
    avatarMenu: {
      accountLabel: "Account",
      settingsLabel: "Settings",
      logoutLabel: "Logout",
    },
    home: {
      title: "Contact Information Storage App",
      subtitle:
        "Welcome to our modern contact information storage app! Manage all your contacts easily with advanced features.",
    },
    about: {
      title: "About Our App",
      paragraph1:
        "Our contact information storage app is designed to help you efficiently manage and organize your contacts. With a modern and intuitive interface, you can easily store and retrieve contact details such as names, phone numbers, email addresses, and more.",
      paragraph2:
        "Stay connected with your network and never lose important contact information again. Our app provides a seamless experience, allowing you to categorize contacts, search and filter through your list, and keep your data up-to-date.",
      paragraph3:
        "Whether you&apos;re an individual or a business, our app is tailored to meet your contact management needs. Simplify your life and enhance your productivity by organizing your contacts efficiently with our powerful yet user-friendly application.",
    },
    login: {
      emailLabel: "Email Address",
      passwordLabel: "Password",
      rememberMeLabel: "Remember Me",
      signinLabel: "Sign In",
      forgotPasswordLabel: "Forgot Password?",
      noAccountLabel: "Don't have an account? Sign Up",
      loginError: "email or password is incorrect",
    },
    signup: {
      pageTitle: "Sign Up",
      firtNameLabel: "Firt Name",
      lastNameLabel: "Last Name",
      ageLabel: "Age",
      ageError: "Age must be between 10 and 100",
      sex: { label: "Sex", female: "Female", male: "Male" },
      usernameLabel: "Username",
      emailLabel: "Email",
      emailError: "Invalid email",
      passwordLabel: "Password",
      passwordError: "Invalid password",
      type: {
        label: "Type",
        user: "User",
        admin: "Admin",
      },
      signupButtonLabel: "Sign Up",
      haveAccount: "Already have an account?",
      login: "Log In",
    },
    connections: {
      pageName: "Connections",
      sort: {
        label: "Sort",
        fav: "⭐ First",
        az: "A→Z",
        za: "Z→A",
      },
      email: "Email",
      phone: "Phone",
    },
    newConnections: {
      titleLabel: "Contact Information",
      firstNameLabel: "First Name",
      lastNameLabel: "Last Name",
      sex: { label: "Sex", female: "Female", male: "Male" },
      ageLabel: "Age",

      emails: {
        emailsSectionLabel: "Emails",
        emailLabel: "Email",
        invalidEmail: "Invalid Email",
        addEmailLabel: "Add Email",
        deleteEmailLabel: "Delete Email",
      },
      phoneNumbers: {
        phoneSectionLabel: "Phone Number",
        phoneLabel: "Phone",
        invalidPhone: "Invalid Phone Number",
        addPhoneNumberLabel: "Add Phone Number",
        deletePhoneNumberLabel: "Delete Phone Number",
      },
      addressLabel: "Address",
      addNewConnection: "Add to Connections",
      updateConnection: "Update Connection",
    },
    settings: {
      pageLabel: "App Settings",
      darkModeLabel: "Dark Mode",
      language: {
        label: "Language",
        englishLabel: "English",
        persianLabel: "Persian",
      },
    },
    common: {
      getStartedButton: "Get Started",
    },
  },
  fr: {
    appBar: {
      appName: "روابط مجازی",
      homeLabel: "خانه",
      connectionsLabel: "روابط",
      aboutLabel: "درباره ما",
    },
    avatarMenu: {
      accountLabel: "حساب کاربری",
      settingsLabel: "تنظیمات",
      logoutLabel: "خروج",
    },
    home: {
      title: "نرم‌افزار ذخیره اطلاعات تماس",
      subtitle:
        "به برنامه ذخیره سازی اطلاعات تماس مدرن ما خوش آمدید! تمام مخاطبین خود را به راحتی با ویژگی های پیشرفته مدیریت کنید.",
    },
    about: {
      title: "درباره برنامه ما",
      paragraph1:
        "برنامه ذخیره سازی اطلاعات تماس ما برای کمک به شما در مدیریت و سازماندهی موثر مخاطبین طراحی شده است. با یک رابط مدرن و بصری، می توانید به راحتی اطلاعات تماس مانند نام، شماره تلفن، آدرس ایمیل و موارد دیگر را ذخیره و بازیابی کنید.",
      paragraph2:
        "با شبکه خود در ارتباط باشید و هرگز اطلاعات مهم تماس را از دست ندهید. برنامه ما تجربه یکپارچه ای را ارائه می دهد و به شما امکان می دهد مخاطبین را دسته بندی کنید، لیست خود را جستجو و فیلتر کنید و داده های خود را به روز نگه دارید.",
      paragraph3:
        "چه یک فرد یا یک کسب و کار باشید، برنامه ما برای رفع نیازهای مدیریت تماس شما طراحی شده است. با سازماندهی موثر مخاطبین خود با برنامه قدرتمند و در عین حال کاربر پسند ما، زندگی خود را ساده کنید و بهره وری خود را افزایش دهید.",
    },
    connections: {
      pageName: "روابط",
      sort: {
        label: "ترتیب",
        fav: "⭐ اول",
        az: "الف←ی",
        za: "ی←الف",
      },
      email: "ایمیل:",
      phone: "شماره تلفن:",
    },
    login: {
      emailLabel: "آدرس ایمیل",
      passwordLabel: "رمز عبور",
      rememberMeLabel: "مرا به خاطر بسپار",
      signinLabel: "ورود",
      forgotPasswordLabel: "رمز خود را فراموش کرده‌اید؟",
      noAccountLabel: "حساب کاربری ندارید؟ ایجاد حساب",
      loginError: "ایمیل یا رمز عبور اشتباه است",
    },
    signup: {
      pageTitle: "ایجاد حساب",
      firtNameLabel: "نام",
      lastNameLabel: "نام خانوادگی",
      ageLabel: "سن",
      ageError: "سن باید بین ۱۰ سال تا ۱۰۰ سال باشد",
      sex: { label: "Sex", female: "Female", male: "Male" },
      usernameLabel: "نام کاربری",
      emailLabel: "ایمیل",
      emailError: "ایمیل نامعتبر است",
      passwordLabel: "رمز عبور",
      passwordError: "رمز عبور نامعتبر",
      type: {
        label: "نوع",
        user: "کاربر",
        admin: "ادمین",
      },
      signupButtonLabel: "ایجاد حساب",
      haveAccount: "از قبل حساب دارید؟",
      login: "ورود",
    },
    newConnections: {
      titleLabel: "اطلاعات رابطه",
      firstNameLabel: "نام",
      lastNameLabel: "نام خانوادگی",
      sex: { label: "جنسیت", female: "زن", male: "مرد" },
      ageLabel: "Age",

      emails: {
        emailsSectionLabel: "ایمیل‌ها",
        emailLabel: "ایمیل",
        invalidEmail: "ایمیل نامعتبر است",
        addEmailLabel: "افزودن ایمیل",
        deleteEmailLabel: "حذف ایمیل",
      },
      phoneNumbers: {
        phoneSectionLabel: "شماره‌های تماس",
        phoneLabel: "شماره تماس",
        invalidPhone: "شماره تماس نامعتبر است",
        addPhoneNumberLabel: "افزودن شماره تماس",
        deletePhoneNumberLabel: "حذف شماره تماس",
      },
      addressLabel: "آدرس",
      addNewConnection: "افزودن به روابط",
      updateConnection: "بروزرسانی رابطه",
    },
    settings: {
      pageLabel: "تنظیمات برنامه",
      darkModeLabel: "حالت تاریک",
      language: {
        label: "زبان",
        englishLabel: "انگلیسی",
        persianLabel: "فارسی",
      },
    },
    common: {
      getStartedButton: "شروع کن",
    },
  },
};

export default strings;
