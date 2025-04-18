"use client";

import { SidebarNavigationItemProps } from "@/types";
import { canAccessItem } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarNavProps = {
  title: string;
  navigation: SidebarNavigationItemProps[];
  department: string;
  role: string;
};

const SidebarNav = ({
  title,
  navigation,
  department,
  role,
}: SidebarNavProps) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex flex-col gap-2">
      <h3 className="sidebar-h3">{title}</h3>
      <ul className="my-2 ml-5 flex flex-col gap-4">
        {navigation.map((item) => {
          const canAccess = canAccessItem(item, department, role);
          return (
            <li key={item.title}>
              <Link
                href={canAccess ? item.url : "/unauthorized"}
                className={`flex gap-2 ${
                  canAccess ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {item.imgUrl && (
                  <Image
                    src={item.imgUrl}
                    alt={item.title}
                    width={15}
                    height={15}
                  />
                )}
                <p
                  className={`uppercase ${
                    pathname === item.url ? "underline" : ""
                  }`}
                >
                  {item.title}
                </p>
              </Link>

              {/* Recursively render children if they exist */}
              {item.children && canAccess && (
                <ul className="ml-6 mt-2 flex flex-col gap-2">
                  {item.children.map((subitem) => (
                    <li key={subitem.title}>
                      <Link
                        href={canAccess ? subitem.url : "/unauthorized"}
                        className={`flex gap-2 ${
                          canAccess ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {subitem.imgUrl && (
                          <Image
                            src={subitem.imgUrl}
                            alt={subitem.title}
                            width={15}
                            height={15}
                          />
                        )}
                        <p
                          className={`${
                            pathname === subitem.url ? "underline" : ""
                          }`}
                        >
                          {subitem.title}
                        </p>
                      </Link>
                      {subitem.children && (
                        <ul className="ml-12 mt-2 flex flex-col gap-2">
                          {subitem.children.map((child) => (
                            <li key={child.title}>
                              <Link
                                href={canAccess ? child.url : "/unauthorized"}
                                className={`flex gap-2 ${
                                  canAccess ? "text-gray-900" : "text-gray-400"
                                }`}
                              >
                                {child.imgUrl && (
                                  <Image
                                    src={child.imgUrl}
                                    alt={child.title}
                                    width={15}
                                    height={15}
                                  />
                                )}
                                <p>{child.title}</p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarNav;
