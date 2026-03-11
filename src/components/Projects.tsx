import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";

const web3Projects = [
    {
      id: 101,
      title: "Solana Faucet",
      description: "A full-stack decentralized application built on Solana blockchain featuring custom SPL token distribution with smart contract integration and modern React frontend.",
      fullDescription: "A full-stack decentralized application built on Solana blockchain featuring custom SPL token distribution with smart contract integration and modern React frontend. The application allows users to request test tokens for development purposes with rate limiting and wallet integration.",
      image: "/faucet.png",
      technologies: ["Anchor Framework", "Tailwind", "Next.js", "Solana Wallet Adapter"],
      liveUrl: "https://faucet.scaleitpro.com",
      githubUrl: "https://github.com/stanmart1/stanfaucet",
      category: "SPL",
      features: ["SPL Token Distribution", "Wallet Integration", "Smart Contract Integration", "Modern UI"]
    },
    {
      id: 102,
      title: "Validator Dashboard",
      description: "The Validator Dashboard is a web3 application that provides real-time insights into Solana validator performance, staking rewards, and MEV (Maximum Extractable Value) opportunities. Built for both individual validators and institutional staking operations, it offers comprehensive network health monitoring and wallet management features.",
      fullDescription: "The Validator Dashboard is a comprehensive web3 application that provides real-time insights into Solana validator performance, staking rewards, and MEV opportunities. Built for both individual validators and institutional staking operations, it offers comprehensive network health monitoring and wallet management features with advanced analytics.",
      image: "/valdash.png",
      technologies: ["Solana Web3", "Tailwind", "React", "Solana Wallet Adapter"],
      liveUrl: "https://valdash.scaleitpro.com",
      githubUrl: "https://github.com/stanmart1/valdash3",
      category: "Validator",
      features: ["Real-time Performance Monitoring", "Staking Rewards Tracking", "MEV Opportunities", "Network Health Analytics", "Wallet Management"]
    },
    {
      id: 103,
      title: "MEV Dashboard",
      description: "A comprehensive MEV (Maximum Extractable Value) analytics platform for Solana providing real-time opportunity detection, validator performance tracking, bundle construction, and advanced MEV attribution.",
      fullDescription: "A decentralized autonomous organization platform enabling community governance through token-based voting and proposal management systems. Empowers communities to make collective decisions transparently and efficiently.",
      image: "/mev.png",
      technologies: ["Express.js", "PostgreSQL", "WebSocket", "Solana Web3.js"],
      liveUrl: "https://mev.scaleitpro.com",
      githubUrl: "https://github.com/stanmart1/mev",
      category: "MEV",
      features: ["Real-time MEV Tracking", "Arbitrage Detection", "Liquidation Monitoring", "WebSocket Notifications"]
    }
];

const Projects = () => {
  const [api, setApi] = React.useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);



  const projects = [
    {
      id: 1,
      title: "Estateman",
      description: "The complete real estate management solution trusted by over 10,000+ agents and brokerages worldwide. Streamline operations, accelerate deal closures, and scale your business with our all-in-one platform designed for modern real estate professionals. Transform Your Real Estate Business From lead generation to closing day, our comprehensive platform handles every aspect of your real estate workflow.",
      image: "/realty.png",
      technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
      liveUrl: "https://estateman.online",
      githubUrl: "#",
      category: "Real Estate Technology"
    },
    {
      id: 2,
      title: "Skylyt Luxury",
      description: "Your Ultimate Travel Companion - Car Rental & Hotel Booking Made Simple. Book smarter, travel better. The all-in-one app trusted by over 2 million travelers worldwide for seamless car rentals and hotel reservations. Compare prices, secure the best deals, and manage your entire trip from one powerful platform. Everything You Need for Perfect Travel Planning Whether you're planning a business trip, family vacation, or weekend getaway, our comprehensive app puts the world's best travel options at your fingertips.",
      image: "/skylyt.png",
      technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
      liveUrl: "https://skylytluxury.com",
      githubUrl: "#",
      category: "Travel Technology"
    },
    {
      id: 6,
      title: "Active Boulevard",
      description: "Website for Active Boulevard - A comprehensive fitness and wellness platform connecting trainers, clients, and fitness enthusiasts in a modern digital ecosystem",
      image: "/active.png",
      technologies: ["React", "Typescript"],
      liveUrl: "https://activeblvd.com/",
      githubUrl: "#",
      category: "Fitness Technology"
    },
    {
      id: 7,
      title: "NIMASA E-Library",
      description: "Nigerian Maritime Administration and Safety Agency's online library platform for maritime books and resources",
      image: "/nim.png",
      technologies: ["Php", "MySQL"],
      liveUrl: "https://nimasaelibraryonline.org/",
      githubUrl: "#",
      category: "Education Technology"
    },
    {
      id: 8,
      title: "Trulaju",
      description: "A fair, fast and precise pay per km coverage that's priced by actual vehicle activities, Making savings for all type of fleet businesses",
      image: "/tru.png",
      technologies: ["React", "Nextjs", "Typescript"],
      liveUrl: "https://trulaju.com",
      githubUrl: "#",
      category: "Insurance Technology"
    },
    {
      id: 9,
      title: "Readnwin",
      description: "The ultimate digital and social reading platform that promotes the reading culture amongst young African youths through incentive programs",
      image: "/read.png",
      technologies: ["React", "FastAPI", "Postgresql"],
      liveUrl: "https://readnwin.com",
      githubUrl: "#",
      category: "Education Technology"
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore my work in web development, and enterprise solutions
          </p>
        </div>

        {/* Web3 Projects Section - Hidden */}
        {/* <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Blockchain & Web3
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {web3Projects.map((project) => (
              <Card key={project.id} className="service-card group hover:border-accent/30 h-full flex flex-col hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300 bg-gray-50"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl group-hover:text-accent transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description.length > 120 ? `${project.description.substring(0, 120)}...` : project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      asChild
                    >
                      <a href={`/project/${project.id}`}>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        View Details
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

        {/* Traditional Projects Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
          Some Of My Work
          </h3>
        </div>
        
        <Carousel 
          className="w-full" 
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent className="md:-ml-4">
            {projects.map((project) => (
              <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="service-card group hover:border-accent/30 h-full flex flex-col hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300 bg-gray-50"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl group-hover:text-accent transition-colors">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {project.description.length > 120 ? `${project.description.substring(0, 120)}...` : project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-6">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          asChild
                        >
                          <a href={`/project/${project.id}`}>
                            <ArrowRight className="w-4 h-4 mr-2" />
                            View Details
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-8 top-1/2 h-12 w-12" />
          <CarouselNext className="-right-8 top-1/2 h-12 w-12" />
        </Carousel>
      </div>
    </section>
  );
};

export { web3Projects };
export default Projects;