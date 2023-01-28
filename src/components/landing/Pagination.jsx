/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";


const Pagination = (props) => {
  const [newStart, setNewStart] = useState(1);
  const [pagesList] = useState([]);
  const pageOptCls = "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-slate-200 focus:z-2";

  useEffect(() => {
    setNewStart(props.start)
    const maxOfPages = Math.ceil(props.totalElementsInCol / props.limit);
    console.log(props.totalElementsInCol, " is total");
    let i = newStart;
    do {
      pagesList.push(i);
      ++i
    } while (i <= maxOfPages);
    console.log(newStart)
    console.log(...pagesList, " is pagesList");
  }, [props.totalElementsInCol]);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-slate-300 mt-7 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previo
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Siguiente
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm px-1 pl-2">
            Mostrando
            <span className="rounded-2xl bg-white text-french-rose font-bold">{props.start}</span>
            a
            <span className="rounded-2xl bg-white text-french-rose font-bold">{props.start + props.pageProductosCount - 1}</span>
            de
            <span className="rounded-2xl bg-white text-french-rose font-bold"> {props.totalElementsInCol}</span> resultados
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-md shadow-slate-200" aria-label="Pagination">
            <button className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              <span className="sr-only">Previous</span>
              <BiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-cyan-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-middle-blue" */}
            {
              pagesList.map(page => {
                  return (
                    <a
                      href="/"
                      className={pageOptCls}
                      key={page.toString()}
                      onClick={ev => {
                        window.localStorage.setItem("pagination", ev.currentTarget.childNodes[0].data)
                      }}
                    >
                      {page.toString()}
                    </a>
                  )
                }
              )
            }
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <BiChevronRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination;