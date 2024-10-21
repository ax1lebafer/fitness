# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
Главная страница приложения
-При нажатии на кнопку «Войти» открывается модальное окно авторизации, если пользователь еще не авторизован.
-Если пользователь авторизован, вместо кнопки «Войти» отображается аватар и логин пользователя, при нажатии на него появляется окно с переходом в профиль и выходом из приложения.
-Внизу страницы расположена кнопка «Наверх» для перемотки в начало страницы.
-На странице отображены все курсы, подключенные к базе данных. 
-Если неавторизованный пользователь пытается добавить курс, то открывается модальное окно для авторицации пользователя.
-Щелкнув на выбранный курс, появляется страница с описанием этого курса.

Страница выбранного курса
-На странице есть кнопка по добавлению курса, если пользователь авторизован. Если авторизации нет, то будет предложено сначала авторизоваться.

Страница входа(модальное окно)
-если пользователь не ввел email или пароль, то появляется соответствующая ошибка "Не введена почта" или "Не введен пароль".
-если пользователь вводит неверные данные, то выходит ошибка "Неверный email или пароль".

Страница регистрации(модальное окно)
-пользователю предложено ввести почту, логин и пароль.
-если пользователь уже зарегистрирован, то кнопка "Войти" перенаправит пользователя на страницу входа.
-если пользователь вводит почту, которая уже зарегистрирована, выходит ошибка "Данный email уже занят".
-если пользователь не заполнил одно из полей, то выходит соответствующая ошибка.
-после успешной регистрации пользователя идет перенаправление на страницу входа, где он может ввести свой логин и пароль.

Страница профиля
-на странице есть информация о пользователе, а также кнопка "Изменить пароль".
-при нажатии на кнопку по смене пароля, появляется модальное окно. Вводя новые данные, их нужно подтвердить.
-на карточке курса пользователь может начать тренировку или продолжить ее, а также видеть свой прогресс.
-так же на карточке есть кнопка для удаления этого курса.

Окно выбора тренировки
-При нажатии на карточку курса появляется модальное окно выбора тренировки, выполненные тренировки отмечены галочкой.
-Чтобы перейти на эту страницу, пользователю необходимо выбрать тренировку и нажать кнопку «Начать».

Страница тренировки
-при нажатии на выбранную обучающую программу пользователь переходит на страницу, где показаны материалы тренировки (видеоролики).
-в таблице прогресса показаны упражнения и процент выполнения их.
-при нажатии на кнопку «Заполнить свой прогресс» появляется модное окно, в котором сначала пользователь вводит данные и сохраняет их. После сохрания появляется окно "Ваш прогресс засчитан", исчезающее через 2 секунды.
-после заполнения прогресса заголовок кнопки меняется на "Обновите свой прогресс".