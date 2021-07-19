import { Menu, Transition } from "@headlessui/react";

/**
 * @param {ReactElement} children //Must provide your own styled button 
 * @param {[Object]} menuList //Menu list options 
*/
export default function Dropdown({ children, menuList, width, header, toTop }) {
  return (
    <div className="relative inline-block text-left z-50 w-full">
      <Menu>
        {({ open }) => (
          <>
            <span className="rounded-md shadow-sm cursor-pointer">
              <Menu.Button as="div">{children}</Menu.Button>
            </span>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className={`${toTop ? "bottom-12" : "mt-2"}
                  absolute left-0 bg-gray-700 border border-gray-500 divide-y divide-gray-100 rounded-md 
                  shadow-lg cursor-pointer outline-none ${width ?? "w-full"}`
                }
              >
                {header}
                <div className="py-1">
                  {
                    menuList.map(menu => {
                      const { label, icon, onClick, borderTop } = menu
                      return (
                        <Menu.Item key={label}>
                          {({ active }) => (
                            <div
                              onClick={onClick}
                              className={
                                `flex items-center px-4 py-2.5 text-sm leading-5 text-left space-x-3 text-white
                                ${active ? "bg-gray-600" : "bg-gray-700"} 
                                ${borderTop && "border-t border-gray-200"}
                              `}
                            >
                              {icon}
                              <span className={active ? "text-blue-300" : "text-white"}>{label}</span>
                            </div>
                          )}
                        </Menu.Item>
                      )
                    })
                  }
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}
