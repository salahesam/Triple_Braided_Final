import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update urls
content = content.replace(
    '''<button
            class="font-body-base text-body-base text-primary bg-accent-dark px-6 py-2 rounded-full border border-primary/30 hover:border-primary transition-all scale-105 active:scale-95">تواصل
            معنا</button>''',
    '''<a href="https://wa.me/+201553704450" target="_blank"
            class="font-body-base text-body-base text-primary bg-accent-dark px-6 py-2 rounded-full border border-primary/30 hover:border-primary transition-all scale-105 active:scale-95 inline-block text-center">تواصل
            معنا</a>'''
)

content = content.replace(
    '''<button
                    class="px-8 py-3 rounded-full bg-gradient-cta text-on-primary font-bold hover:shadow-[0_0_20px_rgba(16,187,178,0.5)] transition-all">تواصل
                    معنا</button>''',
    '''<a href="https://wa.me/+201553704450" target="_blank"
                    class="px-8 py-3 rounded-full bg-gradient-cta text-on-primary font-bold hover:shadow-[0_0_20px_rgba(16,187,178,0.5)] transition-all text-center inline-block">تواصل
                    معنا</a>'''
)

content = content.replace(
    '''<button
                    class="px-8 py-3 rounded-full bg-transparent border border-primary text-primary hover:bg-primary/10 transition-colors">شوف
                    كيف نشتغل ←</button>''',
    '''<a href="#how-it-works"
                    class="px-8 py-3 rounded-full bg-transparent border border-primary text-primary hover:bg-primary/10 transition-colors text-center inline-block">شوف
                    كيف نشتغل ←</a>'''
)

# 2. Update 500 to 300
content = content.replace("بمبيعات 50 – 500 ألف ريال", "بمبيعات 50 – 300 ألف ريال")
content = content.replace("أكثر من 500 ألف ريال", "أكثر من 300 ألف ريال")
content = content.replace("بين 50 و500 ألف ريال", "بين 50 و300 ألف ريال")

# 3. Update How It Works Section ID
content = content.replace(
    '''<!-- 4. How It Works (Timeline) -->
    <section
        class="py-section-py-desktop px-container-px relative z-10 bg-surface-container-lowest border-y border-border-subtle fade-in-section is-visible">''',
    '''<!-- 4. How It Works (Timeline) -->
    <section id="how-it-works"
        class="py-section-py-desktop px-container-px relative z-10 bg-surface-container-lowest border-y border-border-subtle fade-in-section is-visible">'''
)

# 4. Update Features
content = content.replace(
    '''<h3 class="font-card-title text-2xl text-white mb-3">خدمة على قد احتياجك</h3>
                        <p class="text-text-muted">نصمم خدماتنا بما يتناسب مع حجم أعمالك، عشان ما تدفع أكثر من اللي
                            تحتاجه.</p>''',
    '''<h3 class="font-card-title text-2xl text-white mb-3">سعر يبدأ من 700 ريال فقط</h3>
                        <p class="text-text-muted">مع خصم خاص الشهر الأول — أقل من ربع تكلفة موظف داخلي</p>'''
)

content = content.replace(
    '''<h3 class="font-card-title text-2xl text-white mb-3">ملتزمين بالأنظمة السعودية</h3>
                        <p class="text-text-muted">ملمين بمتطلبات هيئة الزكاة والضريبة والجمارك عشان تكون بالسليم.</p>''',
    '''<h3 class="font-card-title text-2xl text-white mb-3">كل ما تحتاجه — بدون باقات</h3>
                        <p class="text-text-muted">نسوي كل الأعمال المحاسبية، ما عندنا نظام باقات مقيد</p>'''
)

content = content.replace(
    '''<h3 class="font-card-title text-2xl text-white mb-3">أوفر بكثير من محاسب داخلي</h3>
                        <p class="text-text-muted">احصل على خبرة فريق كامل بتكلفة أقل من راتب محاسب مبتدئ.</p>''',
    '''<h3 class="font-card-title text-2xl text-white mb-3">بدون عقود أو التزام</h3>
                        <p class="text-text-muted">تعامل مرن شهر بشهر — تقدر تلغي في أي وقت</p>'''
)

content = content.replace(
    '''<h3 class="font-card-title text-2xl text-white mb-3">نظام يكبر مع شغلك</h3>
                        <p class="text-text-muted">كل ما زاد حجم شغلك، احنا جاهزين نستوعب التوسع وندعمك.</p>''',
    '''<h3 class="font-card-title text-2xl text-white mb-3">ضمان استرجاع كامل</h3>
                        <p class="text-text-muted">مبلغك يرجع 100% خلال الشهر الأول إذا ما ناسبك الشغل — بدون أسئلة</p>'''
)

# 5. Remove Scarcity Section
content = content.replace(
    '''<!-- 11. Scarcity + Urgency -->
    <section class="pt-24 px-container-px relative z-10 fade-in-section is-visible">
        <div class="max-w-3xl mx-auto text-center">
            <div
                class="inline-flex items-center gap-2 bg-tertiary-container/10 text-tertiary border border-tertiary/20 px-6 py-2 rounded-full mb-6 font-bold">
                <span class="material-symbols-outlined text-lg">warning</span>
                مهم جداً ⚠️
            </div>
            <p class="text-text-muted text-lg leading-relaxed">
                عشان نضمن تقديم خدمة بجودة عالية واهتمام شخصي لكل عميل، <span class="text-white font-bold">نقبل عدد
                    محدود جداً من العملاء الجدد كل شهر.</span> احجز مكانك الآن قبل اكتمال العدد!
            </p>
        </div>
    </section>''',
    ''''''
)

# 6. Update CTA button
content = content.replace(
    '''<button
                    class="px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_25px_rgba(16,187,178,0.6)] transform hover:-translate-y-1 transition-all duration-300"
                    style="background-color: rgb(16, 187, 178); color: rgb(0, 0, 0);">راسلنا واتساب</button>''',
    '''<a href="https://wa.me/+201553704450" target="_blank"
                    class="px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_25px_rgba(16,187,178,0.6)] transform hover:-translate-y-1 transition-all duration-300 text-center inline-block"
                    style="background-color: rgb(16, 187, 178); color: rgb(0, 0, 0);">راسلنا واتساب</a>'''
)

# 7. Update Footer Links
content = content.replace(
    '''<div class="flex gap-6">
                <a class="font-body-base text-body-base text-text-muted hover:text-primary transition-colors"
                    href="#">سياسة الخصوصية</a>
                <a class="font-body-base text-body-base text-text-muted hover:text-primary transition-colors"
                    href="#">الشروط والأحكام</a>
                <a class="font-body-base text-body-base text-text-muted hover:text-primary transition-colors"
                    href="#">اتصل بنا</a>
            </div>''',
    '''<div class="flex gap-6">
                <a class="font-body-base text-body-base text-text-muted hover:text-primary transition-colors"
                    href="https://www.triple-braided.com/terms">الشروط والأحكام</a>
                <a class="font-body-base text-body-base text-text-muted hover:text-primary transition-colors"
                    href="https://wa.me/+201553704450" target="_blank">تواصل معنا</a>
            </div>'''
)

# 8. Remove footer bottom pb-12 if present and extra padding
content = content.replace('''pt-24 pb-12 border-t''', '''pt-24 pb-4 border-t''')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("index.html updated successfully.")

with open('tailwind.config.js', 'r', encoding='utf-8') as f:
    tw_content = f.read()

# Update Theme Colors
tw_content = tw_content.replace('"#10bbb2"', '"#00c07a"') # primary-container, text-accent, gradient-border
tw_content = tw_content.replace('"#4bdbd1"', '"#00c07a"') # primary, primary-fixed-dim, surface-tint
tw_content = tw_content.replace('"#0e1514"', '"#000000"') # background, surface, surface-dim
tw_content = tw_content.replace('"#2f3635"', '"#00343d"') # surface-container-highest, surface-variant
tw_content = tw_content.replace('"#1a2120"', '"#00343d"') # surface-container
tw_content = tw_content.replace('"#161d1c"', '"#00343d"') # surface-container-low
tw_content = tw_content.replace('"#090f0f"', '"#00343d"') # surface-container-lowest
tw_content = tw_content.replace('"#0a0f0d"', '"#00343d"') # bg-surface
tw_content = tw_content.replace('"rgba(16, 187, 178, 0.4)"', '"rgba(0, 192, 122, 0.4)"')
tw_content = tw_content.replace('"rgba(16, 187, 178, 0.15)"', '"rgba(0, 192, 122, 0.15)"')

with open('tailwind.config.js', 'w', encoding='utf-8') as f:
    f.write(tw_content)

print("tailwind.config.js updated successfully.")
