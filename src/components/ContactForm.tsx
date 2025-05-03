
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-foreground/80 mb-2 text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 glassmorphic rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Your name"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-foreground/80 mb-2 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 glassmorphic rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="your.email@example.com"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-foreground/80 mb-2 text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 glassmorphic rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          placeholder="How can I help you?"
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary glassmorphic w-full py-3"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
