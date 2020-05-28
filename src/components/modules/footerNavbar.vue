<template>
    <nav>
        <ul>
            <strong>О компании</strong>
            <hr />
            <li><router-link to="/o-kompanii" v-text="`О компании`" /></li>
            <li>
                <span v-text="`Обратная связь`" v-on:click="$emit('modal')" />
            </li>
            <li><router-link to="/kontakty" v-text="`Контакты`" /></li>
        </ul>

        <ul>
            <strong>Для покупателей</strong>
            <hr />
            <li>
                <router-link
                    to="/vozvrat-i-obmen"
                    v-text="`Условия продажи товаров для ЮЛ`"
                />
            </li>
            <li>
                <router-link
                    to="/garantijnye-obyazatelstva"
                    v-text="`Политика обработки ПД`"
                />
            </li>
            <li>
                <router-link
                    to="/dokumenty-i-sertifikaty"
                    v-text="'Документы и Сертификаты'"
                />
            </li>
        </ul>

        <ul>
            <strong>Адрес и Контакты</strong>
            <hr />
            <li>ООО«ГЛОБАЛЬНЫЕ ЦИФРОВЫЕ ТЕХНОЛОГИИ»</li>
            <li>+79258603573</li>
            <li>
                Email:
                <a href="mail-to:info@medtrading.org">info@medtrading.org</a>
            </li>
        </ul>

        <ul>
            <li style="margin: 1em auto 1em 1em;"></li>
            <li class="phone">
                <a href="tel:+79258603573">8 (925) 860-35-73</a>
            </li>
            <li>
                <button
                    class="button button__base"
                    v-on:click="$emit('modal')"
                    v-text="`Обратный звонок`"
                />
            </li>
        </ul>
    </nav>
</template>
