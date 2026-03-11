import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { web3Projects } from "@/components/Projects";
import { features } from "process";

const ProjectDetail = () => {
  const { id } = useParams();

  const projects = [
    {
      id: 1,
      title: "Estateman",
      description: "The complete real estate management solution trusted by over 10,000+ agents and brokerages worldwide. Streamline operations, accelerate deal closures, and scale your business with our all-in-one platform designed for modern real estate professionals.",
      fullDescription: "The complete real estate management solution trusted by over 10,000+ agents and brokerages worldwide. Streamline operations, accelerate deal closures, and scale your business with our all-in-one platform designed for modern real estate professionals. Transform Your Real Estate Business From lead generation to closing day, our comprehensive platform handles every aspect of your real estate workflow. Manage listings, nurture client relationships, track commissions, and automate routine tasks while focusing on what you do best - closing deals and growing your network.",
      image: "/realty.png",
      technologies: ["React", "TypeScript", `FastAPI`, "PostgreSQL"],
      liveUrl: "https://estateman.online",
      githubUrl: "#",
      category: "Real Estate Technology",
      features: ["Lead Generation", "Listing Management", "Client Relationship Management", "Commission Tracking", "Deal Pipeline"]
    },
    {
      id: 2,
      title: "Skylit Luxury",
      description: "Your Ultimate Travel Companion - Car Rental & Hotel Booking Made Simple. Book smarter, travel better. The all-in-one app trusted by over 2 million travelers worldwide for seamless car rentals and hotel reservations.",
      fullDescription: "Your Ultimate Travel Companion - Car Rental & Hotel Booking Made Simple. Book smarter, travel better. The all-in-one app trusted by over 2 million travelers worldwide for seamless car rentals and hotel reservations. Compare prices, secure the best deals, and manage your entire trip from one powerful platform. Everything You Need for Perfect Travel Planning Whether you're planning a business trip, family vacation, or weekend getaway, our comprehensive app puts the world's best travel options at your fingertips. Compare thousands of cars and accommodations, book instantly, and enjoy exclusive member benefits wherever your journey takes you.",
      image: "/skylyt.png",
      technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
      liveUrl: "https://skylytluxury.com",
      githubUrl: "#",
      category: "Travel Technology",
      features: ["Car Rental Booking", "Hotel Reservations", "Price Comparison", "Trip Management", "Member Benefits"]
    },

    {
      id: 6,
      title: "Active Boulevard",
      description: "Website for Active Boulevard - A comprehensive fitness and wellness platform connecting trainers, clients, and fitness enthusiasts in a modern digital ecosystem.",
      fullDescription: "Active Boulevard is a cutting-edge fitness and wellness platform that revolutionizes how people discover, connect with, and engage in fitness activities. Our platform serves as a comprehensive hub where certified trainers can showcase their expertise, clients can find personalized training programs, and fitness enthusiasts can access premium workout content, nutrition guidance, and community support. Built with modern web technologies, Active Boulevard features an intuitive user interface to create seamless experiences for all users.",
      image: "/active.png",
      technologies: ["React", "TypeScript"],
      liveUrl: "https://activeblvd.com/",
      githubUrl: "#",
      category: "Fitness Technology",
      features: ["Trainer Profiles", "Class Booking System", "Progress Tracking", "Community Features", "Mobile Responsive Design"]
    },
    {
      id: 7,
      title: "NIMASA E-Library",
      description: "Nigerian Maritime Administration and Safety Agency's online library platform for maritime books and resources",
      fullDescription: "The NIMASA E-Library is an online platform developed for the Nigerian Maritime Administration and Safety Agency (NIMASA) to provide easy access to a vast collection of maritime books, research papers, and resources. This digital library serves as a comprehensive repository for maritime professionals, students, and researchers, offering a user-friendly interface for browsing, searching, and downloading maritime literature.",
      image: "/nim.png",
      technologies: ["Php", "MySQL"],
      liveUrl: "https://nimasaelibraryonline.org/",
      githubUrl: "#",
      category: "Education Technology",
      features: ["Extensive Maritime Collection", "Search Functionality", "User Account Management", "Downloadable Resources", "Mobile-Friendly Design"]
    },
    {
      id: 8,
      title: "Trulaju",
      description: "A fair, fast and precise pay per km coverage that's priced by actual vehicle activities, Making savings for all type of fleet businesses",
      fullDescription: "Trulaju is a revolutionary insurance platform that offers fair, fast, and precise pay-per-km coverage based on actual vehicle activities. Designed to help fleet businesses save money while ensuring comprehensive protection.",
      image: "/tru.png",
      technologies: ["React", "Nextjs", "Typescript"],
      liveUrl: "https://trulaju.com",
      githubUrl: "#",
      category: "Insurance Technology",
      features: ["Pay-per-kilometer fleet insurance", "Real-Time mileage monitoring", "Fleet management dashboard", "Digital claims processing"]
    },
    {
      id: 9,
      title: "Readnwin",
      description: "The ultimate digital and social reading platform that promotes the reading culture amongst young African youths through incentive programs",
      fullDescription: "Readnwin is a cutting-edge digital and social reading platform designed to promote the reading culture among young African youths through innovative incentive programs.",
      image: "/read.png",
      technologies: ["React", "FastAPI", "Postgresql"],
      liveUrl: "https://readnwin.com",
      githubUrl: "#",
      category: "Education Technology",
      features: ["Built-in E-reader", "Reading Analytics", "Admin dashboard with full administration features", "User Dashboard", "Mobile-Friendly Design", "Payment Integration"]
    },
  ];

  const allProjects = [...projects, ...web3Projects];
  const project = allProjects.find(p => p.id === parseInt(id || "0"));

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Project Not Found</h1>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button 
            variant="outline"
            onClick={() => {
              window.history.back();
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 lg:h-96 object-contain rounded-lg shadow-lg bg-gray-50"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="bg-accent/10 text-accent mb-4">
                {project.category}
              </Badge>
              <h1 className="text-4xl font-bold text-primary mb-4">{project.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex gap-4">
              <Button asChild className="btn-hero">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Demo
                </a>
              </Button>
              {project.githubUrl && project.githubUrl !== "#" && (
                <Button asChild variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View On Github
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;