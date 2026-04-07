import { useEffect, useState } from "react";
import "./App.css";

const tg = window.Telegram?.WebApp;

function App() {
    const [activeTab, setActiveTab] = useState("Discipline");
    const [action, setAction] = useState("Create");
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (tg) {
            tg.ready();
            tg.expand();
        }
    }, []);

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

        if (tg) {
            tg.sendData(JSON.stringify(payload));
        }
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
                    color: isActive ? "#0d6efd" : "#6c757d",
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
        <div className="bg-light" style={{ minHeight: "100vh", paddingBottom: "90px" }}>
            <div className="pt-4 pb-2 px-3 mb-3 shadow-sm bg-white">
                <h2 className="m-0 text-center fw-bold h5">
                    {activeTab === "Discipline"
                        ? "Disciplines"
                        : activeTab === "StudyGroup"
                            ? "Study Groups"
                            : "Relations"}
                </h2>
            </div>

            <div className="container">
                <div className="mb-4 p-3 rounded shadow-sm bg-white">
                    <label className="form-label fw-medium small text-muted mb-1">Action Type</label>
                    <select
                        className="form-select"
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                    >
                        <option value="Create">Create New</option>
                        <option value="Read">Read</option>
                        <option value="Update">Update Existing</option>
                        <option value="Delete">Delete</option>
                    </select>
                </div>

                <div className="p-3 rounded shadow-sm mb-4 bg-white">
                    {activeTab === "Discipline" && (
                        <>
                            {(action === "Read" ||
                                action === "Update" ||
                                action === "Delete") && (
                                    <div className="mb-3">
                                        <label className="form-label fw-medium small text-muted mb-1">
                                            Discipline ID
                                        </label>
                                        <input
                                            className="form-control"
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
                                        <label className="form-label fw-medium small text-muted mb-1">Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            onChange={handleChange}
                                            value={formData.name || ""}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-medium small text-muted mb-1">Type</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="type"
                                            onChange={handleChange}
                                            value={formData.type || ""}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-medium small text-muted mb-1">
                                            Faculties
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="faculties"
                                            onChange={handleChange}
                                            value={formData.faculties || ""}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-medium small text-muted mb-1">
                                            Difficulty (1-10)
                                        </label>
                                        <input
                                            className="form-control"
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

                    {activeTab === "StudyGroup" && (
                        <>
                            <div className="mb-3">
                                <label className="form-label fw-medium small text-muted mb-1">Group ID</label>
                                <input
                                    className="form-control"
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
                                        <label className="form-label fw-medium small text-muted mb-1">
                                            Specialization Code
                                        </label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="specialization"
                                            onChange={handleChange}
                                            value={
                                                formData.specialization || ""
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-medium small text-muted mb-1">
                                            Course (Year)
                                        </label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="course"
                                            onChange={handleChange}
                                            value={formData.course || ""}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-medium small text-muted mb-1">
                                            Education Type
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="educationType"
                                            onChange={handleChange}
                                            value={formData.educationType || ""}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-medium small text-muted mb-1">
                                            Students Count
                                        </label>
                                        <input
                                            className="form-control"
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

                    {activeTab === "GroupDiscipline" && (
                        <>
                            <div className="mb-3">
                                <label className="form-label fw-medium small text-muted mb-1">Group ID</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="groupId"
                                    onChange={handleChange}
                                    value={formData.groupId || ""}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-medium small text-muted mb-1">Discipline ID</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="disciplineId"
                                    onChange={handleChange}
                                    value={formData.disciplineId || ""}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-medium small text-muted mb-1">Semester</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="semester"
                                    onChange={handleChange}
                                    value={formData.semester || ""}
                                />
                            </div>

                            {(action === "Create" || action === "Update") && (
                                <div className="mb-3">
                                    <label className="form-label fw-medium small text-muted mb-1">Exam Type</label>
                                    <input
                                        className="form-control"
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
                        className="btn btn-primary btn-lg w-100 mt-3 shadow-sm fw-bold"
                        onClick={sendDataToBot}
                    >
                        Send to Bot
                    </button>
                </div>
            </div>

            <div
                className="fixed-bottom shadow-lg border-top bg-white d-flex justify-content-around"
                style={{
                    paddingTop: "8px",
                    paddingBottom: "calc(8px + env(safe-area-inset-bottom))",
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

