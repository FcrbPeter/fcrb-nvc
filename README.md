# NVC Emotion Selector

![CI](https://github.com/FcrbPeter/fcrb-nvc/actions/workflows/ci.yml/badge.svg)


A bilingual web application designed to help users practice **Nonviolent Communication (NVC)**. This tool guides you through the process of identifying your observations, feelings, and needs to gain clarity on your inner state.

## Features

- **5-Step Process**:
    1.  **Topic**: Describe the situation objectively.
    2.  **Emotions**: Identify your emotions from a categorized list (Satisfied/Unsatisfied).
    3.  **Needs**: Discover the underlying needs behind your emotions.
    4.  **Feedback**: Review the constructed NVC statement.
    5.  **Summary**: View the complete content with options to **Save as Image** or **Print**.
- **Bilingual Support**: Seamlessly switch between English and Traditional Chinese via URL (e.g., `/en-US`, `/zh-TW`).
- **URL-Based Routing**: Application state and language are reflected in the URL for easy sharing and navigation.
- **Responsive Design**: Optimized for both desktop and mobile use, featuring a modern UI with Tailwind CSS.
- **Image Export**: Save the summary card as an image for easy sharing and printing.

## Tech Stack

- **Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using CSS Variables & OKLCH colors), `class-variance-authority`, `clsx`
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Internationalization**: [react-i18next](https://react.i18next.com/)
- **Utilities**: `html-to-image` for capturing summary cards.

## Project Structure

```
src/
├── components/   # Reusable UI components (buttons, cards, layout)
├── data/         # Static data for emotions and needs
├── i18n/         # Localization configurations and translation files
├── layouts/      # Application layout wrappers
├── pages/        # Main route components (Topic, Emotions, Needs, Summary)
├── lib/          # Utility functions (utils.ts)
└── index.css     # Global styles and Tailwind v4 configuration
```

## Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/fcrb-nvc-app.git
    cd fcrb-nvc-app
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    # or
    pnpm dev
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Copyright (c) 2025 FcrbPeter
