import { useEffect, useState } from "react";
import "./App.css";

const tg = window.Telegram.WebApp;

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        tg.ready();
        tg.expand();
        if (tg.initDataUnsafe?.user) {
            setUser(tg.initDataUnsafe.user);
        }
    }, []);

    const sendDataToBot = () => {
        const data = JSON.stringify({
            action: "create_student",
            value: "test",
        });

        tg.sendData(data);
    };

    const closeApp = () => {
        tg.close();
    };

    return (
        <div
            style={{
                color: "var(--tg-theme-text-color)",
                backgroundColor: "var(--tg-theme-bg-color)",
                height: "100vh",
                padding: "20px",
            }}
        >
            <h1>University Mini App</h1>
            {user ? <p>Hello, {user.first_name}!</p> : <p>Hello, Guest!</p>}

            <button
                onClick={sendDataToBot}
                style={{
                    backgroundColor: "var(--tg-theme-button-color)",
                    color: "var(--tg-theme-button-text-color)",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    marginTop: "20px",
                }}
            >
                Send Data to Bot
            </button>

            <button
                onClick={closeApp}
                style={{ display: "block", marginTop: "10px" }}
            >
                Close App
            </button>
        </div>
    );
}

export default App;
