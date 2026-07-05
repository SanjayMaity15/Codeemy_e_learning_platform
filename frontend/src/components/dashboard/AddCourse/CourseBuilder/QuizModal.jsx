import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setCourse } from "../../../../feature/courseSlice";
import IconBtn from "../../../common/IconBtn";

export default function QuizModal({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) {


    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
    } = useForm();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const { course } = useSelector((state) => state.course);

    useEffect(() => {
        if (view || edit) {
            setValue("title", modalData.title);
            setValue("passingMarks", modalData.passingMarks);
            setValue("duration", modalData.duration);
        }
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();

        if (
            currentValues.title !== modalData.title ||
            Number(currentValues.passingMarks) !== modalData.passingMarks ||
            Number(currentValues.duration) !== modalData.duration
        ) {
            return true;
        }

        return false;
    };

    const handleEditQuiz = async () => {
        try {
            const currentValues = getValues();

            const data = {
                quizId: modalData._id,
            };

            if (currentValues.title !== modalData.title) {
                data.title = currentValues.title;
            }

            if (
                Number(currentValues.passingMarks) !== modalData.passingMarks
            ) {
                data.passingMarks = Number(currentValues.passingMarks);
            }

            if (
                Number(currentValues.duration) !== modalData.duration
            ) {
                data.duration = Number(currentValues.duration);
            }

            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}course/updateQuiz`,
                data,
                {
                    withCredentials: true,
                }
            );

            const result = response.data.data;

            if (result) {
                const updatedCourseContent = course.courseContent.map((section) =>
                    section._id === modalData.sectionId ? result : section
                );

                const updatedCourse = {
                    ...course,
                    courseContent: updatedCourseContent,
                };

                dispatch(setCourse(updatedCourse));

                toast.success("Quiz Updated Successfully");
            }

            setModalData(null);
        } catch (error) {
            console.log(error);
            toast.error("Failed to Update Quiz");
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        if (view) return;

        // Edit Quiz
        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No Changes Made");
                return;
            }

            await handleEditQuiz();
            return;
        }

        // Add Quiz
        try {
            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}course/createQuiz`,
                {
                    title: data.title,
                    sectionId: modalData,
                    passingMarks: Number(data.passingMarks),
                    duration: Number(data.duration),
                },
                {
                    withCredentials: true,
                }
            );

            const result = response.data.data;

            if (result) {
                // Update Course Redux
                const updatedCourseContent = course.courseContent.map((section) =>
                    section._id === modalData ? result : section
                );

                const updatedCourse = {
                    ...course,
                    courseContent: updatedCourseContent,
                };

                dispatch(setCourse(updatedCourse));

                toast.success("Quiz Created Successfully");
            }

            setModalData(null);
        } catch (error) {
            console.log(error);

            toast.error(
                error?.response?.data?.message || "Failed to Create Quiz"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-1000 mt-0! grid h-screen w-screen place-items-center overflow-auto bg-black/50 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-xl rounded-lg border bg-white">

                {/* Header */}
                <div className="flex items-center justify-between rounded-t-lg p-5 border-b">
                    <p className="text-xl font-semibold text-black-5">
                        {view && "Viewing "}
                        {add && "Add "}
                        {edit && "Edit "}
                        Quiz
                    </p>

                    <button
                        onClick={() => (!loading ? setModalData(null) : {})}
                    >
                        <RxCross2 className="text-2xl text-black-5" />
                    </button>
                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 p-8"
                >

                    {/* Quiz Title */}

                    <div className="flex flex-col space-y-2">

                        <label htmlFor="title">
                            Quiz Title
                            {!view && <sup className="text-red-600">*</sup>}
                        </label>

                        <input
                            id="title"
                            type="text"
                            placeholder="Enter Quiz Title"
                            disabled={view || loading}
                            {...register("title", {
                                required: true,
                            })}
                            className="form-style w-full rounded-2xl border bg-white p-2 px-4 outline-primary"
                        />

                        {errors.title && (
                            <span className="text-sm text-red-600">
                                Quiz Title is required
                            </span>
                        )}

                    </div>

                    {/* Passing Marks */}

                    <div className="flex flex-col space-y-2">

                        <label htmlFor="passingMarks">
                            Passing Percentage %
                            {!view && <sup className="text-red-600">*</sup>}
                        </label>

                        <input
                            id="passingMarks"
                            type="number"
                            disabled={view || loading}
                            placeholder="Enter Passing Marks"
                            {...register("passingMarks", {
                                required: true,
                                min: 1,
                            })}
                            className="form-style w-full rounded-2xl border bg-white p-2 px-4 outline-primary"
                        />

                        {errors.passingMarks && (
                            <span className="text-sm text-red-600">
                                Passing Marks is required
                            </span>
                        )}

                    </div>

                    {/* Duration */}

                    <div className="flex flex-col space-y-2">

                        <label htmlFor="duration">
                            Duration (Minutes)
                            {!view && <sup className="text-red-600">*</sup>}
                        </label>

                        <input
                            id="duration"
                            type="number"
                            disabled={view || loading}
                            placeholder="Enter Duration"
                            {...register("duration", {
                                required: true,
                                min: 1,
                            })}
                            className="form-style w-full rounded-2xl border bg-white p-2 px-4 outline-primary"
                        />

                        {errors.duration && (
                            <span className="text-sm text-red-600">
                                Duration is required
                            </span>
                        )}

                    </div>

                    {/* Button */}

                    {!view && (
                        <div className="flex justify-end">

                            <IconBtn
                                disabled={loading}
                                loading={loading}
                                text={
                                    loading
                                        ? "Loading..."
                                        : edit
                                            ? "Save Changes"
                                            : "Create Quiz"
                                }
                            />

                        </div>
                    )}

                </form>

            </div>
        </div>
    )
}