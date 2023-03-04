/* eslint-disable react/react-in-jsx-scope */
import { BsEraserFill } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";


const TBody = ({ products }) => {
    return (
        <>
            {
                products.map(doc => {
                    return (
                        <tr key={doc["id"]} className="divide-x divide-zinc-700 overflow-y-auto
                        text-lg text-zinc-700 odd:bg-slate-100 even:bg-white odd:hover:bg-slate-200 even:hover:bg-gray-200"
                        >
                            <td className="rounded-sm px-2 text-sm w-1/4 md:text-lg lg:text-lg xl:text-lg 2xl:text-xl">{doc["categoria"]}</td>
                            <td className="rounded-sm px-1 text-sm w-1/6 text-center md:text-lg lg:text-lg xl:text-lg 2xl:text-xl">{doc["id"]}</td>
                            <td className="rounded-sm px-2 text-sm w-5/12 md:text-lg lg:text-lg xl:text-lg 2xl:text-xl">{doc["detalle"]}</td>
                            <td className="rounded-sm px-2 text-sm w-5/12 md:text-lg lg:text-lg xl:text-lg 2xl:text-xl">{doc["precio"]}</td>
                            <td className="rounded-sm px-2 text-sm w-5/12 text-center md:text-lg lg:text-lg xl:text-lg 2xl:text-xl">{doc["cantidad"]}</td>
                            <td className="rounded-sm px-1 text-sm w-5/12 text-center md:text-lg lg:text-lg xl:text-lg 2xl:text-xl">
                                <div className="flex flex-row">
                                    <button className="rounded-sm bg-zinc-500 px-1 py-1 text-sm text-white hover:bg-air-super-blue"><FiEdit3 /></button>
                                    <button className="rounded-sm bg-red-500 px-1 py-1 text-sm text-white hover:bg-french-rose"><BsEraserFill /></button>
                                </div>
                            </td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default TBody;