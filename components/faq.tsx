"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconPlus } from "@tabler/icons-react";

const faqs = [
  {
    question: "How does LynxHire's AI matching work?",
    answer: "Our AI analyzes each candidate's skills, experience, location, work authorization, and salary expectations against your job requirements. Every applicant receives a 0–100 match score so you review the best fits first — not just whoever applied earliest."
  },
  {
    question: "What makes LynxHire different from Indeed or LinkedIn?",
    answer: "Indeed charges per click with no quality guarantee. LinkedIn is built for networking, not hiring. LynxHire is a flat monthly subscription built specifically for Canadian SMBs — with AI matching, a built-in ATS, and Canadian-first filters like province and work authorization status."
  },
  {
    question: "How much does it cost to post a job?",
    answer: "Your first job posting is free, forever. Paid plans start at $149/month CAD for up to 10 active postings with advanced AI matching. All prices are in Canadian dollars with no hidden fees or per-click charges."
  },
  {
    question: "Is LynxHire available across all Canadian provinces?",
    answer: "Yes. LynxHire supports job postings and candidate profiles across all 10 provinces and 3 territories. You can filter candidates by province and work authorization type (Canadian citizen, PR, open work permit, employer-specific permit)."
  },
  {
    question: "Is my data protected under Canadian privacy law?",
    answer: "Yes. LynxHire is fully compliant with PIPEDA, Canada's federal privacy law. All data is stored and processed in compliance with Canadian regulations. We never sell your data to third parties."
  },
  {
    question: "Can candidates use LynxHire for free?",
    answer: "Yes. LynxHire is always free for job seekers. Create your profile, apply to jobs, and get AI-matched to opportunities at no cost."
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold mb-4">
            Frequently <span className="text-[#FF6B2B]">Asked</span> Questions
          </h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
          Common questions about LynxHire's AI-powered job platform. Whether you're an employer
          looking to hire or a job seeker searching for your next role, we've got answers.

          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 rounded-[22px] bg-[#DCDCDC] p-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-[17px] border border-[#EBEBEB] bg-gradient-to-b from-[#F6F6F6] via-[#FDFDFD] to-[#F6F6F6] shadow-[0px_95px_27px_0px_rgba(0,0,0,0.00),_0px_61px_24px_0px_rgba(0,0,0,0.03),_0px_34px_21px_0px_rgba(0,0,0,0.11),_0px_15px_15px_0px_rgba(0,0,0,0.19),_0px_4px_8px_0px_rgba(0,0,0,0.22)] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center gap-2 text-left"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <IconPlus size={20} className="text-[#FF6B2B]" />
                </motion.div>
                <span className="text-lg text-neutral-800">{faq.question}</span>
              </button>
              <AnimatePresence mode="sync">
                {openIndex === index && (
                  <motion.div
                    key={`content-${index}`}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { 
                        height: "auto",
                        opacity: 1,
                        transition: { 
                          type: "spring",
                          stiffness: 400,
                          damping: 40,
                          mass: 1
                        }
                      },
                      collapsed: { 
                        height: 0,
                        opacity: 0,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 40,
                          mass: 1
                        }
                      }
                    }}
                    className="px-6 overflow-hidden"
                  >
                    <div className="pb-5">
                      <p className="text-neutral-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}