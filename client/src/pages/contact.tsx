import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  MessageSquare,
  Bug,
  Lightbulb,
  ThumbsUp,
  HelpCircle,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { KolamPatternBg } from "@/components/kolam-pattern-bg";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { FAQ } from "@shared/schema";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  feedbackType: z.enum(["bug", "suggestion", "praise", "other"]),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const feedbackTypes = [
  { value: "bug", label: "Bug Report", icon: Bug, color: "bg-red-500/10 text-red-600 dark:text-red-400" },
  { value: "suggestion", label: "Suggestion", icon: Lightbulb, color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
  { value: "praise", label: "Praise", icon: ThumbsUp, color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  { value: "other", label: "Other", icon: HelpCircle, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
];

const faqs: FAQ[] = [
  {
    id: "1",
    question: "What is Kolam art?",
    answer:
      "Kolam is a traditional South Indian art form consisting of geometric patterns drawn on the ground using rice flour, chalk, or colored powder. It's typically drawn at the entrance of homes as part of daily rituals.",
  },
  {
    id: "2",
    question: "How does the Kolam Analyzer work?",
    answer:
      "Our AI-powered analyzer uses computer vision and machine learning to detect patterns, symmetry, and colors in your uploaded Kolam images. It can identify the type of Kolam, measure complexity, and extract the color palette used.",
  },
  {
    id: "3",
    question: "Can I download my generated Kolam designs?",
    answer:
      "Yes! You can download your generated designs in both SVG (vector) and PNG (raster) formats. SVG is ideal for printing at any size without quality loss.",
  },
  {
    id: "4",
    question: "Are the tutorials suitable for beginners?",
    answer:
      "Absolutely! Our learning module starts with basic concepts in Level 1 (Beginner) and gradually progresses to more complex patterns. Each lesson includes step-by-step instructions and video tutorials.",
  },
  {
    id: "5",
    question: "What file formats are supported for analysis?",
    answer:
      "The analyzer supports JPG and PNG image formats with a maximum file size of 10MB. For best results, use well-lit images with clear contrast between the Kolam and the background.",
  },
  {
    id: "6",
    question: "Is there a mobile app available?",
    answer:
      "Currently, KolamKala is a web-based application optimized for both desktop and mobile browsers. You can access all features from any modern web browser on your phone or tablet.",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      feedbackType: "other",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your feedback. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    submitMutation.mutate(data);
  };

  return (
    <div className="relative min-h-screen py-8 md:py-12">
      <KolamPatternBg opacity={0.02} />
      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30">
            Get in Touch
          </Badge>
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Have questions, suggestions, or feedback? We'd love to hear from you.
            Fill out the form below or check our FAQ section.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <Card className="overflow-visible" data-testid="card-contact-form">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold">
                      Thank You!
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Your message has been sent successfully. We'll get back to
                      you soon.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => setIsSubmitted(false)}
                      data-testid="button-send-another"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} data-testid="input-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  {...field}
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="What's this about?"
                                {...field}
                                data-testid="input-subject"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="feedbackType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Feedback Type</FormLabel>
                            <FormControl>
                              <div className="flex flex-wrap gap-2">
                                {feedbackTypes.map((type) => (
                                  <Button
                                    key={type.value}
                                    type="button"
                                    variant={field.value === type.value ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => field.onChange(type.value)}
                                    className="gap-2"
                                    data-testid={`button-type-${type.value}`}
                                  >
                                    <type.icon className="h-4 w-4" />
                                    {type.label}
                                  </Button>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us more about your feedback..."
                                rows={5}
                                {...field}
                                data-testid="textarea-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full gap-2"
                        disabled={submitMutation.isPending}
                        data-testid="button-submit"
                      >
                        {submitMutation.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card id="faq" className="overflow-visible" data-testid="card-faq">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-lg">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left hover:no-underline" data-testid={`accordion-faq-${faq.id}`}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="overflow-visible bg-accent/50" data-testid="card-info">
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-semibold">
                  About KolamKala
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  KolamKala is dedicated to preserving and promoting the beautiful
                  tradition of Kolam art through technology. Our AI-powered tools
                  make it easy to analyze, create, and learn this ancient art form.
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-primary">Response Time:</span>
                    <span className="text-muted-foreground">Within 24-48 hours</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">Support Hours:</span>
                    <span className="text-muted-foreground">Mon-Fri, 9AM-6PM IST</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
