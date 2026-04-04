import { useEffect, useState } from "react";
import "./App.css";

const tg = window.Telegram.WebApp;

function App() {
    const [activeTab, setActiveTab] = useState("Discipline");
    const [action, setAction] = useState("Create");
    const [formData, setFormData] = useState({});

    useEffect(() => {
        tg.ready();
        tg.expand();
    }, []);

    // Очищаем форму при смене вкладки или действия
    useEffect(() => {
        setFormData({});
    }, [activeTab, action]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendDataToBot = () => {
        const payload = { entity: activeTab, action: action };

        if (activeTab === "Discipline") {
            payload.disciplineData = {
                id: formData.id ? parseInt(formData.id) : 0,
                name: formData.name || "",
                type: formData.type || "",
                faculties: formData.faculties || "",
                difficulty: formData.difficulty
                    ? parseInt(formData.difficulty)
                    : 0,
            };
        } else if (activeTab === "StudyGroup") {
            payload.studyGroupData = {
                id: formData.id || "",
                specialization: formData.specialization
                    ? parseInt(formData.specialization)
                    : 0,
                course: formData.course ? parseInt(formData.course) : 0,
                educationType: formData.educationType || "",
                studentsCount: formData.studentsCount
                    ? parseInt(formData.studentsCount)
                    : 0,
            };
        } else if (activeTab === "GroupDiscipline") {
            payload.groupDisciplineData = {
                groupId: formData.groupId || "",
                disciplineId: formData.disciplineId
                    ? parseInt(formData.disciplineId)
                    : 0,
                semester: formData.semester ? parseInt(formData.semester) : 0,
                examType: formData.examType || "",
            };
        }

        tg.sendData(JSON.stringify(payload));
    };

    const appBgStyle = {
        backgroundColor: "var(--tg-theme-secondary-bg-color, #f3f2f8)",
        color: "var(--tg-theme-text-color, #000000)",
        minHeight: "100vh",
        paddingBottom: "90px",
    };

    const inputStyle = {
        backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
        color: "var(--tg-theme-text-color, #000000)",
        borderColor: "var(--tg-theme-hint-color, #ced4da)",
    };

    const labelStyle = {
        color: "var(--tg-theme-hint-color, #6c757d)",
        fontWeight: "500",
        fontSize: "0.9rem",
        marginBottom: "0.25rem",
    };

    const renderBottomTab = (id, label, iconClass) => {
        const isActive = activeTab === id;
        return (
            <div
                onClick={() => setActiveTab(id)}
                className="d-flex flex-column align-items-center justify-content-center"
                style={{
                    flex: 1,
                    cursor: "pointer",
                    color: isActive
                        ? "var(--tg-theme-button-color, #007aff)"
                        : "var(--tg-theme-hint-color, #999999)",
                    transition: "color 0.2s",
                }}
            >
                <i
                    className={`bi ${iconClass}`}
                    style={{ fontSize: "1.5rem", lineHeight: "1" }}
                ></i>
                <span
                    style={{
                        fontSize: "0.75rem",
                        marginTop: "2px",
                        fontWeight: isActive ? "600" : "400",
                    }}
                >
                    {label}
                </span>
            </div>
        );
    };

    return (
        <div style={appBgStyle}>
            {/* Header */}
            <div
                className="pt-4 pb-2 px-3 mb-3 shadow-sm"
                style={{ backgroundColor: "var(--tg-theme-bg-color, #ffffff)" }}
            >
                <h2
                    className="m-0 text-center"
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color: "var(--tg-theme-text-color, #000000)",
                    }}
                >
                    {activeTab === "Discipline"
                        ? "Disciplines"
                        : activeTab === "StudyGroup"
                          ? "Study Groups"
                          : "Relations"}
                </h2>
            </div>

            {/* Main Content */}
            <div className="container">
                {/* Action Selector */}
                <div
                    className="mb-4 p-3 rounded shadow-sm"
                    style={{
                        backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
                    }}
                >
                    <label style={labelStyle}>Action Type</label>
                    <select
                        className="form-select form-select-lg"
                        style={inputStyle}
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                    >
                        <option value="Create">Create New</option>
                        <option value="Read">Read</option>
                        <option value="Update">Update Existing</option>
                        <option value="Delete">Delete</option>
                    </select>
                </div>

                {/* Dynamic Form */}
                <div
                    className="p-3 rounded shadow-sm mb-4"
                    style={{
                        backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
                    }}
                >
                    {/* DISCIPLINE */}
                    {activeTab === "Discipline" && (
                        <>
                            {/* Для Read, Update и Delete нам нужен ID */}
                            {(action === "Read" ||
                                action === "Update" ||
                                action === "Delete") && (
                                <div className="mb-3">
                                    <label style={labelStyle}>
                                        Discipline ID
                                    </label>
                                    <input
                                        className="form-control"
                                        style={inputStyle}
                                        type="number"
                                        name="id"
                                        onChange={handleChange}
                                        value={formData.id || ""}
                                    />
                                </div>
                            )}
                            {(action === "Create" || action === "Update") && (
                                <>
                                    <div className="mb-3">
                                        <label style={labelStyle}>Name</label>
                                        <input
                                            className="form-control"
                                            style={inputStyle}
                                            type="text"
                                            name="name"
                                            onChange={handleChange}
                                            value={formData.name || ""}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label style={labelStyle}>Type</label>
                                        <input
                                            className="form-control"
                                            style={inputStyle}
                                            type="text"
                                            name="type"
                                            onChange={handleChange}
                                            value={formData.type || ""}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label style={labelStyle}>
                                            Faculties
                                        </label>
                                        <input
                                            className="form-control"
                                            style={inputStyle}
                                            type="text"
                                            name="faculties"
                                            onChange={handleChange}
                                            value={formData.faculties || ""}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label style={labelStyle}>
                                            Difficulty (1-10)
                                        </label>
                                        <input
                                            className="form-control"
                                            style={inputStyle}
                                            type="number"
                                            name="difficulty"
                                            onChange={handleChange}
                                            value={formData.difficulty || ""}
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {/* STUDY GROUP */}
                    {activeTab === "StudyGroup" && (
                        <>
                            <div className="mb-3">
                                <label style={labelStyle}>Group ID</label>
                                <input
                                    className="form-control"
                                    style={inputStyle}
                                    type="text"
                                    name="id"
                                    maxLength={6}
                                    onChange={handleChange}
                                    value={formData.id || ""}
                                />
                            </div>

                            {(action === "Create" || action === "Update") && (
                                <>
                                    <div className="mb-3">
                                        <label style={labelStyle}>
                                            Specialization Code
                                        </label>
                                        <input
                                            className="form-control"
                                            style={inputStyle}
                                            type="number"
                                            name="specialization"
                                            onChange={handleChange}
                                            value={
                                                formData.specialization || ""
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label style={labelStyle}>
                                            Course (Year)
                                        </label>
                                        <input
                                            className="form-control"
                                            style={inputStyle}
                                            type="number"
                                            name="course"
                                            onChange={handleChange}
                                            value={formData.course || ""}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label style={labelStyle}>
                                            Education Type
                                        </label>
                                        <input
                                            className="form-control"
                                            style={inputStyle}
                                            type="text"
                                            name="educationType"
                                            onChange={handleChange}
                                            value={formData.educationType || ""}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label style={labelStyle}>
                                            Students Count
                                        </label>
                                        <input
                                            className="form-control"
                                            style={inputStyle}
                                            type="number"
                                            name="studentsCount"
                                            onChange={handleChange}
                                            value={formData.studentsCount || ""}
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {/* GROUP DISCIPLINE */}
                    {activeTab === "GroupDiscipline" && (
                        <>
                            {/* Эти поля нужны всегда (это составной ключ) */}
                            <div className="mb-3">
                                <label style={labelStyle}>Group ID</label>
                                <input
                                    className="form-control"
                                    style={inputStyle}
                                    type="text"
                                    name="groupId"
                                    onChange={handleChange}
                                    value={formData.groupId || ""}
                                />
                            </div>
                            <div className="mb-3">
                                <label style={labelStyle}>Discipline ID</label>
                                <input
                                    className="form-control"
                                    style={inputStyle}
                                    type="number"
                                    name="disciplineId"
                                    onChange={handleChange}
                                    value={formData.disciplineId || ""}
                                />
                            </div>
                            <div className="mb-3">
                                <label style={labelStyle}>Semester</label>
                                <input
                                    className="form-control"
                                    style={inputStyle}
                                    type="number"
                                    name="semester"
                                    onChange={handleChange}
                                    value={formData.semester || ""}
                                />
                            </div>

                            {(action === "Create" || action === "Update") && (
                                <div className="mb-3">
                                    <label style={labelStyle}>Exam Type</label>
                                    <input
                                        className="form-control"
                                        style={inputStyle}
                                        type="text"
                                        name="examType"
                                        onChange={handleChange}
                                        value={formData.examType || ""}
                                    />
                                </div>
                            )}
                        </>
                    )}

                    <button
                        className="btn btn-lg w-100 mt-3 shadow-sm"
                        onClick={sendDataToBot}
                        style={{
                            backgroundColor:
                                "var(--tg-theme-button-color, #007aff)",
                            color: "var(--tg-theme-button-text-color, #ffffff)",
                            fontWeight: "bold",
                        }}
                    >
                        Send to Bot
                    </button>
                </div>
            </div>

            {/* iOS-Style Bottom Navigation */}
            <div
                className="fixed-bottom shadow-lg border-top"
                style={{
                    backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
                    paddingTop: "8px",
                    paddingBottom: "calc(8px + env(safe-area-inset-bottom))",
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                {renderBottomTab("Discipline", "Disciplines", "bi-book")}
                {renderBottomTab("StudyGroup", "Groups", "bi-people")}
                {renderBottomTab(
                    "GroupDiscipline",
                    "Relations",
                    "bi-link-45deg",
                )}
            </div>
        </div>
    );
}

export default App;
