import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Linkedin, Send, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaCompleted, setRecaptchaCompleted] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleRecaptchaChange = (token: string | null) => {
    console.log('reCAPTCHA token received:', !!token);
    setRecaptchaToken(token);
    setRecaptchaCompleted(!!token);
    if (token && errors.recaptcha) {
      setErrors(prev => ({ ...prev, recaptcha: '' }));
    }
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setRecaptchaCompleted(false);
  };

  const handleRecaptchaError = () => {
    console.error('reCAPTCHA error occurred');
    setRecaptchaToken(null);
    setRecaptchaCompleted(false);
    setErrors(prev => ({ ...prev, recaptcha: 'reCAPTCHA failed to load' }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    if (!recaptchaCompleted) {
      newErrors.recaptcha = "Please complete the reCAPTCHA";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const htmlTemplate = `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #1a365d 0%, #2d9a8c 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0;">Stanley Tech Tapestry</p>
          </div>
          
          <div style="background: white; margin: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="padding: 30px;">
              <div style="margin-bottom: 25px;">
                <h3 style="color: #1a365d; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Contact Information</h3>
                <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #2d9a8c;">
                  <p style="margin: 0 0 8px 0; color: #334155;"><strong>Name:</strong> ${formData.name}</p>
                  <p style="margin: 0; color: #334155;"><strong>Email:</strong> <a href="mailto:${formData.email}" style="color: #2d9a8c; text-decoration: none;">${formData.email}</a></p>
                </div>
              </div>
              
              <div>
                <h3 style="color: #1a365d; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Message</h3>
                <div style="background: #f8fafc; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #475569; line-height: 1.6; white-space: pre-wrap;">${formData.message}</p>
                </div>
              </div>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; color: #64748b; font-size: 14px;">Received on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </div>
      `;
      
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_subject', `New Contact Form Submission from ${formData.name}`);
      formDataToSend.append('_replyto', formData.email);
      if (recaptchaToken) {
        formDataToSend.append('g-recaptcha-response', recaptchaToken);
      }
      
      const response = await fetch('https://formspree.io/f/movnveqa', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formDataToSend
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setRecaptchaToken(null);
        setRecaptchaCompleted(false);

        recaptchaRef.current?.reset();
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      // Reset reCAPTCHA on error
      setRecaptchaToken(null);
      setRecaptchaCompleted(false);

      recaptchaRef.current?.reset();
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-secondary to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to discuss your technology needs? Let's start a conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="service-card border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Let's Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you need custom software development, IT support, cybersecurity solutions, 
                  or live sound engineering services, I'm here to help turn your vision into reality.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-primary">Email</p>
                      <a 
                        href="mailto:stanleym37@gmail.com"
                        className="text-accent hover:text-accent-dark transition-colors"
                      >
                        stanleym37@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Linkedin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-primary">LinkedIn</p>
                      <a 
                        href="https://www.linkedin.com/in/stanley-ayo-2633697a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-dark transition-colors"
                      >
                        Connect with me
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-primary">Location</p>
                      <p className="text-muted-foreground">Nigeria</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card className="service-card border-accent/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Why Work With Me?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">15+ years of proven experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Comprehensive technology solutions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Fast response and reliable support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Focus on practical, user-friendly solutions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="service-card border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-primary font-medium">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`border-border/50 focus:border-accent focus:ring-accent/20 ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Your full name"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-primary font-medium">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`border-border/50 focus:border-accent focus:ring-accent/20 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="your.email@example.com"
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-primary font-medium">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`border-border/50 focus:border-accent focus:ring-accent/20 resize-none ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Tell me about your project or how I can help you..."
                      required
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-center">
                      <div id="recaptcha-container">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                          onChange={handleRecaptchaChange}
                          onExpired={handleRecaptchaExpired}
                          onError={handleRecaptchaError}
                        />
                      </div>
                    </div>
                    {errors.recaptcha && <p className="text-red-500 text-sm mt-1">{errors.recaptcha}</p>}
                  </div>
                  
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg mb-4">
                      <CheckCircle className="w-5 h-5" />
                      <span>Message sent successfully!</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-4">
                      <AlertCircle className="w-5 h-5" />
                      <span>Failed to send message. Please try again.</span>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !recaptchaCompleted}
                    className="w-full btn-hero text-lg py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;