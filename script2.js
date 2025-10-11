
        // ======= НАСТРОЙКИ TELEGRAM БОТА =======
        const TELEGRAM_BOT_TOKEN = '7591550884:AAEMcXk1oTmVMbOhecmH3Q4qVKa-R8dQ5FA'; // Замените на токен вашего бота
        const TELEGRAM_CHAT_ID = '-1003180419111';     // Замените на ID канала/чата
        // =======================================

        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');

        async function sendToTelegram(destination, phone) {
            const message = `
🆕 Yangi Ariza!

📍 Yo'nalish: ${destination}
📱 Telefon: ${phone}
⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}
            `.trim();

            const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
            
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: message,
                        parse_mode: 'HTML'
                    })
                });

                const data = await response.json();
                
                if (data.ok) {
                    return { success: true };
                } else {
                    throw new Error(data.description || 'Xatolik yuz berdi');
                }
            } catch (error) {
                console.error('Telegram xatosi:', error);
                return { success: false, error: error.message };
            }
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const destination = document.getElementById('destination').value;
            const phone = document.getElementById('phone').value;
            
            // Блокируем кнопку
            submitBtn.disabled = true;
            submitBtn.textContent = 'YUBORILMOQDA...';
            
            // Отправляем в Telegram
            const result = await sendToTelegram(destination, phone);
            
            if (result.success) {
                alert('✅ Ariza muvaffaqiyatli yuborildi!');
                form.reset();
            } else {
                alert('❌ Xatolik: ' + result.error);
            }
            
            // Разблокируем кнопку
            submitBtn.disabled = false;
            submitBtn.textContent = 'YUBORISH';
        });
