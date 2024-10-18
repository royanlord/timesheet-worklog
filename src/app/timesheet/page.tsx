import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"
import TimeSheet from "./TimeSheet"

const page = () => {
    return (
        <ProtectedRoute>
            <TimeSheet />
        </ProtectedRoute>
    )
}

export default page