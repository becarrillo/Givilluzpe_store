/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";


const Pagination = (props) => {
  const [pagesList] = useState([]);
  const initialPageOptCls = "relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium hover:ease-linear focus:z-2";
  const storagePage = window.localStorage.getItem("pagination");
  const maxOfPages = Math.ceil(props.totalElementsInCol / props.limit);             // en: How many products pages are totally    // es: Cantidad de páginas de productos en total 

  useEffect(() => {
    var page = 8*(props.pagesBeginFragment-1)+1;     // en: Create a variable calculating page number from beginning pagination fragment // es: Se crea variable de página de comienzo de fragmento
    const pLimit = page+7;

    // en: We conditionate when pages number limit is less than totally of products pages   // es: Condicionamos cuando el límite de números de páginas sea menor que el total páginas de productos
    if (pLimit < maxOfPages) {
      do {
        pagesList.push(page);      // en: We add to an empty array each current page number with conditional do-while statement  // es: Agregamos al array vacío cada número de página con do-while
        ++page;
      } while (page <= pLimit);
      // en: now conditionate when pages num. limit is greather than totally of pages  // es: ahoea condicionamos cuando el número límite de páginas es mayor que el total páginas de próductos
    } else {
      do {
        pagesList.push(page);      // en: We add to an empty array each current page number with conditional do-while statement  // es: Agregamos al array vacío cada número de página con do-while
        ++page;
      } while (page <= maxOfPages);
    }
  }, [props.totalElementsInCol, props.pagesBeginFragment]);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-slate-300 mt-7 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="/"
          className="relative inline-flex items-center rounded-md border border-gray-300 
            bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          // eslint-disable-next-line quotes
          onClick={() => {window.localStorage.setItem("pagination", storagePage-1)}}
        >
          Previo
        </a>
        <a
          href="/"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 
            bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          // eslint-disable-next-line quotes
          onClick={() => {window.localStorage.setItem("pagination", storagePage+1)}}
        >
          Siguiente
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="block text-sm px-1 pl-2 space-x-2">
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
            {/* en: When page*8 fragment to be less or greather than 1 then it conditionate presence of 'Previous' btn */}
            {
              props.pagesBeginFragment>1 ? (
                <button className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white 
                  px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"  
                  onClick={() => {
                    window.localStorage.setItem("pagination", (8*(props.pagesBeginFragment-1)-7).toString())
                  }
                }>
                  <a href="/">
                    <span className="sr-only">Previous</span>
                    <BiChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </a>
                </button>
              ) : <></>
            }
            {
              pagesList.map(page => {
                return (
                    <a
                      href="/" 
                      className={
                        storagePage !== page.toString() ? 
                          initialPageOptCls+" bg-white hover:scale-105" 
                          : 
                          initialPageOptCls+" bg-zinc-500 text-white font-semibold scale-110"
                      }
                      key={page.toString()}
                      onClick={ev => {
                        // en: to save into storage the child o this element when to be clicked // es: guarda el hijo de éste elemento en el storage cuando sea pinchado
                        window.localStorage.setItem("pagination", ev.currentTarget.childNodes[0].data)
                      }}
                      disabled={storagePage !== page.toString() ? false : true}
                    >
                      {page.toString()}
                    </a>
                  )
                }
              )
            }
            {/* en: When page*8 fragment to be less or greather than 1 then it conditionate presence of 'Previous' btn */}
            {
              props.pagesBeginFragment < Math.ceil(maxOfPages/8) ? (
                <button className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white 
                  px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"  
                  onClick={() => {
                    window.localStorage.setItem("pagination", (props.pagesBeginFragment * 8 + 1).toString())
                  }
                }>
                  <a href="/#">
                    <span className="sr-only">Next</span>
                    <BiChevronRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                </button>
              ) : <></>
            }
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination;