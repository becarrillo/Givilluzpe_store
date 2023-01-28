/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../../context/TodoContext";
import { useNavigate } from "react-router-dom";
import { ChaoticOrbit } from '@uiball/loaders'
import firebase from "../../firebase";


export function ProductoLogger() {
    const [picFileSt, setPicFileSt] = useState(null);
    const apiContext = useContext(TodoContext);
    const navigate = useNavigate();
    const submitHandler = async ev => {
        ev.preventDefault();

        const toSaveConfirm =  window.confirm("¿Estás seguro(a) de realizar la acción? Se guardará el nuevo producto");
        
        if (toSaveConfirm) {
            setPageJsxTemplate(
                <div className="flex flex-col space-y-3.5 py-72">
                    <div className="mx-auto">
                        <ChaoticOrbit
                            size={25}
                            speed={1.5}
                            color="black"
                        />
                    </div>
                    <h3 className="text-lg mx-auto">Esperar</h3>
                </div>
            );
            if (picFileSt) {
                const picUrlResult = await apiContext.fb.uploadFile(picFileSt);
                console.log(picUrlResult, " es el resultado de picUrlResult");
                apiContext.productObj["foto_url"] = picUrlResult;
                console.log(apiContext.productObj, " Es el objeto producto nuevo pero ya con la foto_url");
            }
            console.log(apiContext.productObj);
            await firebase.saveProducto(apiContext.productObj["referencia"], apiContext.productObj);
            navigate("/admin");
        } else console.log("Guardado cancelado");
    }

    const [pageJsxTemplate, setPageJsxTemplate] = useState(
        <form onSubmit={submitHandler} className="flex flex-col space-y-9 px-2 py-3">
            <h2 className="text-center text-2xl text-cyan-800 font-semibold mt-3">Confirmar datos producto nuevo</h2>
            <hr />
            <table className="shadow-sm shadow-zinc-500 mb-7">
                <thead>
                    <tr className="bg-zinc-500 text-white h-8">
                        <th className="text-start">Campo</th>
                        <th>Valor</th>
                        <th className="text-start">
                            <button className="rounded-sm shadow-sm shadow-zinc-100 bg-blue-500 px-2 hover:bg-blue-400">Editar</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-orange-50">
                        <td>Categoría</td>
                        <td className="text-center">{apiContext.productObj["categoria"]}</td>
                        <td>
                            <button className="rounded-sm bg-blue-500 text-sm text-white font-semibold px-2">Editar</button>
                        </td>
                    </tr>
                    <tr className="bg-zinc-200">
                        <td>Referencia</td>
                        <td className="text-center">{apiContext.productObj["referencia"]}</td>
                        <td>
                            <button className="rounded-sm bg-blue-500 text-sm text-white font-semibold px-2">Editar</button>
                        </td>
                    </tr>
                    <tr className="bg-orange-50">
                        <td>Detalle</td>
                        <td className="text-center">{apiContext.productObj["detalle"]}</td>
                        <td>
                            <button className="rounded-sm bg-blue-500 text-sm text-white font-semibold px-2">Editar</button>
                        </td>
                    </tr>
                    <tr className="bg-zinc-200">
                        <td>Precio</td>
                        <td className="text-center">{apiContext.productObj["precio"]}</td>
                        <td>
                            <button className="rounded-sm bg-blue-500 text-sm text-white font-semibold px-2">Editar</button>
                        </td>
                    </tr>
                    <tr className="bg-orange-50">
                        <td>Cantidad</td>
                        <td className="text-center">{apiContext.productObj["cantidad"]}</td>
                        <td>
                            <button className="rounded-sm bg-blue-500 text-sm text-white font-semibold px-2">Editar</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="flex flex-col rounded-lg bg-gray-100 shadow-sm shadow-zinc-500 mx-auto px-2 py-3 w-full md:w-7/12 lg:w-5/12 xl:w-5/12 2x:w-5/12">
                <h3 className="text-lg text-cyan-900 mx-auto py-5">Agrega imágen/fotografía desde tus archivos</h3>
                <div className="grid grid-rows-2 mx-auto">
                    <label htmlFor="pic-file" className="text-sm font-semibold">Imágen/fotografía</label>
                    <input type="file" accept="image/jpg, image/jpeg, image/png" id="pic-file"
                    required={true}
                    onChange={ev => { setPicFileSt(ev.target.files.item(0)) }}
                    />
                    <small className="text-red-500">** Obligatorio</small>
                </div>
            </div>

            <button type="submit" className="rounded-sm bg-green-600 text-cyan-50 font-semibold self-center mt-7 px-7 py-2 w-7/12 hover:bg-green-500">Guardar/Subir</button>
        </form>
    );

    useEffect(() => {
        console.log(apiContext.productObj, " es el objeto de los datos Producto");
    }, [apiContext.productObj]);

    return  pageJsxTemplate;
}