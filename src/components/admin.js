import React from "react"

function Admin() {
    return(
        <div className="bg-gray-100">
             <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
                <div className="p-6">
                    <p className="text-white text-3xl font-semibold uppercase">Admin</p>
                </div>
                <nav className="text-white text-base font-semibold pt-3">
                    <a href="index.html" className="flex items-center active-nav-link text-white py-4 pl-6 nav-item">
                        <i className="fas fa-chart-pie mr-3"></i>
                        Dashboard
                    </a>
                </nav>
            </aside>
        </div>
    );
}

export default Admin;