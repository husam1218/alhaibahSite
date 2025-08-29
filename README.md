# محلات الهيبة للدهان — موقع ثابت مع Decap (Netlify CMS)

تحديث المحتوى يتم عبر لوحة تحكم `/admin` دون الحاجة لتعديل الكود. مناسب للرفع على GitHub والربط مع Netlify.

## المتطلبات
- حساب GitHub
- حساب Netlify

## خطوات النشر
1) ارفع مجلد `site` كمستودع على GitHub.
2) في Netlify اختر "Import from Git" واربط المستودع. لا حاجة لأوامر بناء (Static). اضبط Publish directory على `site` أو ارفع محتويات `site` إلى الجذر.
3) فعّل Git Gateway من: Site settings → Identity → Enable Identity، ثم Enable Git Gateway.
4) افتح `https://YOUR_SITE.netlify.app/admin/` لتسجيل الدخول وإدارة المحتوى.

## إدارة الوسائط
- تُرفع الصور إلى `assets/images` تلقائياً عبر لوحة التحكم.

## تعديل المحتوى يدويًا (اختياري)
- الملف `content.json` يحتوي النصوص والصور والروابط. أي تعديل فيه ينعكس مباشرة على الموقع.

## تطوير محلي
- يمكن فتح `index.html` مباشرة في المتصفح. لتمكين الرفع المحلي للوسائط عبر CMS استخدم خادم محلي بسيط.
