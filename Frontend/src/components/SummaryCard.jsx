import {
    FaLaptop,
    FaCheckCircle,
    FaUserCheck,
    FaTools
} from "react-icons/fa";

function SummaryCard({ title, value }) {

    let icon;
    let bgColor;

    if (title === "Total Assets") {
        icon = <FaLaptop className="text-4xl text-blue-600" />;
        bgColor = "from-blue-50 to-blue-100";
    }

    else if (title === "Available Assets") {
        icon = <FaCheckCircle className="text-4xl text-green-600" />;
        bgColor = "from-green-50 to-green-100";
    }

    else if (title === "Assigned Assets") {
        icon = <FaUserCheck className="text-4xl text-purple-600" />;
        bgColor = "from-purple-50 to-purple-100";
    }

    else {
        icon = <FaTools className="text-4xl text-orange-600" />;
        bgColor = "from-orange-50 to-orange-100";
    }

    return (
        <div
            className={`
                bg-gradient-to-r ${bgColor}
                rounded-2xl
                shadow-lg
                p-8
                hover:scale-105
                transition-all
                duration-300
                cursor-pointer
            `}
        >

            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-700">
                    {title}
                </h3>

                {icon}
            </div>

            <h2 className="text-5xl font-bold text-gray-900">
                {value}
            </h2>

        </div>
    );
}

export default SummaryCard;