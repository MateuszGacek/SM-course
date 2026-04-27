export const courses = [
  {
    slug: "social-media",
    title: "Social Media Mastery",
    summary: "Build a repeatable system for strategy, content planning, publishing, analysis, and iteration.",
    level: "Beginner to Intermediate",
    status: "Active",
    accent: "#5eead4",
    tags: ["strategy", "content", "analytics", "brand"],
    outcomes: [
      "Define audience and positioning for a course, creator, or business.",
      "Plan content pillars and weekly publishing rhythms.",
      "Review performance with practical metrics and next actions."
    ],
    subcourses: [
      {
        slug: "strategy",
        title: "Strategy Foundations",
        summary: "Clarify audience, offer, channels, and measurable goals before publishing.",
        duration: "4 lessons",
        status: "Start here",
        lessons: [
          {
            id: "audience-map",
            title: "Audience Map",
            summary: "Turn a broad target group into concrete audience segments and learning needs.",
            topics: ["persona", "pain points", "desired outcomes", "objections"],
            tasks: [
              "Write three audience segments.",
              "List one painful problem and one desired result for each segment.",
              "Choose the segment with the clearest path to value."
            ],
            hints: [
              "Prefer specific situations over vague demographics.",
              "Use language your audience would actually type or say."
            ]
          },
          {
            id: "positioning",
            title: "Positioning Statement",
            summary: "Create a concise promise that connects audience, problem, and proof.",
            topics: ["promise", "differentiation", "proof", "tone"],
            tasks: [
              "Draft a one-sentence positioning statement.",
              "Add two proof points that support the promise.",
              "Remove jargon until it reads naturally."
            ],
            hints: [
              "A useful statement can guide content decisions.",
              "If it could fit any brand, make it sharper."
            ]
          },
          {
            id: "channel-fit",
            title: "Channel Fit",
            summary: "Choose channels based on audience behavior, content format, and feedback speed.",
            topics: ["platforms", "format", "distribution", "feedback loops"],
            tasks: [
              "Pick one primary and one secondary channel.",
              "Define the strongest content format for each.",
              "Decide what signal will prove the channel is working."
            ],
            hints: [
              "Start with fewer channels than you think you need.",
              "A channel is useful when it supports a repeatable workflow."
            ]
          },
          {
            id: "measurement",
            title: "Measurement Basics",
            summary: "Select a small set of metrics that support better decisions.",
            topics: ["reach", "engagement", "conversion", "learning loop"],
            tasks: [
              "Choose one awareness metric.",
              "Choose one quality metric.",
              "Write a weekly review question for each metric."
            ],
            hints: [
              "Metrics should change what you do next.",
              "Avoid tracking everything in the first version."
            ]
          }
        ]
      },
      {
        slug: "content-planning",
        title: "Content Planning",
        summary: "Create reusable content pillars, lesson formats, and a practical publishing calendar.",
        duration: "3 lessons",
        status: "Core",
        lessons: [
          {
            id: "pillars",
            title: "Content Pillars",
            summary: "Define repeatable themes that connect expertise with audience demand.",
            topics: ["pillars", "angles", "series", "content mix"],
            tasks: [
              "Create four content pillars.",
              "Add five post angles to each pillar.",
              "Mark which pillars educate, persuade, or build trust."
            ],
            hints: [
              "Good pillars reduce planning friction.",
              "Each pillar should support the main course promise."
            ]
          },
          {
            id: "formats",
            title: "Reusable Formats",
            summary: "Turn ideas into repeatable post structures that are easier to produce.",
            topics: ["templates", "hooks", "examples", "repurposing"],
            tasks: [
              "Choose three recurring formats.",
              "Write one hook pattern for each format.",
              "Create one example post outline."
            ],
            hints: [
              "Formats are production tools, not creative limits.",
              "Repeat the structure while changing the insight."
            ]
          },
          {
            id: "calendar",
            title: "Publishing Calendar",
            summary: "Plan a realistic weekly cadence that supports consistency.",
            topics: ["calendar", "cadence", "batching", "review"],
            tasks: [
              "Choose a weekly publishing cadence.",
              "Assign pillars to publishing days.",
              "Reserve one review slot each week."
            ],
            hints: [
              "Sustainable cadence beats ambitious chaos.",
              "Leave space for timely ideas and experiments."
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "ai-productivity",
    title: "AI Productivity Systems",
    summary: "Use AI tools to build repeatable workflows for research, writing, planning, and review.",
    level: "Beginner",
    status: "Draft",
    accent: "#fbbf24",
    tags: ["ai", "workflow", "systems", "writing"],
    outcomes: [
      "Break knowledge work into clear AI-assisted workflows.",
      "Write prompts that produce reviewable outputs.",
      "Create personal operating procedures for repeated tasks."
    ],
    subcourses: [
      {
        slug: "fundamentals",
        title: "AI Workflow Fundamentals",
        summary: "Learn the basic loop: define task, provide context, review output, and save the process.",
        duration: "3 lessons",
        status: "Draft",
        lessons: [
          {
            id: "task-framing",
            title: "Task Framing",
            summary: "Describe a task so an AI assistant knows the goal, constraints, and expected output.",
            topics: ["goal", "context", "constraints", "format"],
            tasks: [
              "Rewrite one vague request into a precise task.",
              "Add constraints and examples.",
              "Define the output format before asking."
            ],
            hints: [
              "Most weak outputs start with unclear tasks.",
              "Examples are often faster than long explanations."
            ]
          },
          {
            id: "review-loop",
            title: "Review Loop",
            summary: "Check outputs systematically instead of accepting them at face value.",
            topics: ["verification", "rubrics", "edge cases", "revision"],
            tasks: [
              "Create a five-point review checklist.",
              "Test an output against one edge case.",
              "Ask for a revision with specific feedback."
            ],
            hints: [
              "Treat AI output as a draft.",
              "A checklist makes quality easier to repeat."
            ]
          },
          {
            id: "workflow-library",
            title: "Workflow Library",
            summary: "Save prompts, checklists, and examples as reusable personal procedures.",
            topics: ["templates", "SOPs", "knowledge base", "iteration"],
            tasks: [
              "Document one repeated workflow.",
              "Save the prompt, context checklist, and review criteria.",
              "Run it twice and improve one step."
            ],
            hints: [
              "A saved workflow is more valuable than a clever one-off prompt.",
              "Version workflows when your process changes."
            ]
          }
        ]
      }
    ]
  }
];

export function findCourse(slug) {
  return courses.find((course) => course.slug === slug);
}

export function findSubcourse(courseSlug, subcourseSlug) {
  const course = findCourse(courseSlug);
  return course?.subcourses.find((subcourse) => subcourse.slug === subcourseSlug);
}

