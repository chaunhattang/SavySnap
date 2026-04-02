/** @format */

"use client";

import handleAPI from "@/apis/handleAPI";
import { Button, Divider, Space, Typography } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";

const Home = () => {
  const t = useTranslations("Welcome");

  const mySocialLinks = [
    { name: "youtube", url: "" },
    { name: "github", url: "" },
    { name: "facebook", url: "" },
    {
      name: "tiktok",
      url: "",
    },
  ];

  // ví dụ dùng Redux
  // const auth = useSelector(authSelector);
  // console.log(auth);

  // ví dụ dùng handleAPI
  const getPosts = async () => {
    try {
      const res = await handleAPI("/posts");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container py-4">
      <div className="row ">
        <div className="col-sm-12 col-md-8 offset-md-2">
          <div className="mt-5 py-5 text-center">
            <Typography.Title type="secondary" level={2} className="mb-2">
              {t("title")}
            </Typography.Title>

            <Typography.Text code copyable type="secondary" className="mb-4">
              {t("create")}
            </Typography.Text>
          </div>
          <Typography.Paragraph>{t("author")} </Typography.Paragraph>
          <div className="bg-light">
            <Typography.Paragraph>{t("description")}</Typography.Paragraph>
            <blockquote className="blockquote">
              <blockquote className="blockquote">
                <ul>
                  <li>
                    <Typography.Text italic className="mb-4">
                      {t("multiLanguages")} (Next-Intl)
                    </Typography.Text>
                  </li>
                  <li>
                    <Typography.Text italic className="mb-4">
                      {t("multiLanguages")} Tailwind / Bootstrap / Ant Design
                    </Typography.Text>
                  </li>
                  <li>
                    <Typography.Text italic className="mb-4">
                      TypeScript + ESLint
                    </Typography.Text>
                  </li>
                  <li>
                    <Typography.Text italic className="mb-4">
                      App Router (Next.js 14+)
                    </Typography.Text>
                  </li>
                </ul>
              </blockquote>
            </blockquote>
            <Typography.Paragraph>
              {t("multiLanguageslDescription")}
            </Typography.Paragraph>
            <Link href={"https://nextjs.org/docs"}>{t("docs")}</Link>
          </div>
          <div className="mt-4 text-center">
            <Divider orientation="center">{t("followMe")}</Divider>
            <Space>
              {mySocialLinks.map((link) => (
                <Button
                  key={link.name}
                  type="text"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  shape="round"
                  size="small"
                  icon={<i className={`fab fa-${link.name}`} />}
                />
              ))}
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
